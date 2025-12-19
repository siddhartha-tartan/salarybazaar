import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// --- Types ---

type PolicyStatus = 'active' | 'processing' | 'failed';

interface PolicyVersion {
  id: string;
  version: string;
  status: PolicyStatus;
  createdAt: string; // ISO date string
}

interface Policy {
  id: string;
  name: string;
  versions: PolicyVersion[];
}

interface Category {
  id: string;
  name: string;
  policies: Policy[];
}

// --- Mock Data ---

const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-health',
    name: 'Health Insurance',
    policies: [
      {
        id: 'pol-premium-care',
        name: 'Premium Care Plan',
        versions: [
          { id: 'v-pc-2.0', version: '2.0', status: 'processing', createdAt: '2023-12-01T10:00:00Z' },
          { id: 'v-pc-1.0', version: '1.0', status: 'active', createdAt: '2023-01-01T10:00:00Z' },
        ],
      },
      {
        id: 'pol-basic-cover',
        name: 'Basic Health Cover',
        versions: [
          { id: 'v-bc-1.0', version: '1.0', status: 'active', createdAt: '2023-05-01T10:00:00Z' },
        ],
      },
    ],
  },
  {
    id: 'cat-life',
    name: 'Life Insurance',
    policies: [
      {
        id: 'pol-term-life',
        name: 'Term Life Wrapper',
        versions: [
          { id: 'v-tl-1.0', version: '1.0', status: 'processing', createdAt: '2023-11-01T10:00:00Z' },
        ],
      },
      {
        id: 'pol-whole-life',
        name: 'Whole Life Advantage',
        versions: [
          { id: 'v-wl-3.0', version: '3.0', status: 'failed', createdAt: '2023-12-15T10:00:00Z' },
          { id: 'v-wl-2.0', version: '2.0', status: 'active', createdAt: '2023-06-01T10:00:00Z' },
          { id: 'v-wl-1.0', version: '1.0', status: 'active', createdAt: '2022-01-01T10:00:00Z' },
        ],
      },
    ],
  },
  {
    id: 'cat-vehicle',
    name: 'Vehicle Insurance',
    policies: [
      {
        id: 'pol-car-comprehensive',
        name: 'Car Comprehensive',
        versions: [
          { id: 'v-cc-2.0', version: '2.0', status: 'active', createdAt: '2023-09-01T10:00:00Z' },
          { id: 'v-cc-1.0', version: '1.0', status: 'active', createdAt: '2022-09-01T10:00:00Z' },
        ],
      },
       {
        id: 'pol-bike-TP',
        name: 'Bike Third Party',
        versions: [
          { id: 'v-bt-1.0', version: '1.0', status: 'failed', createdAt: '2023-11-20T10:00:00Z' },
        ],
      },
    ],
  },
];

// --- Helpers ---

const getLatestVersion = (policy: Policy): PolicyVersion => {
  // Sort by createdAt desc
  return [...policy.versions].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
};

const isPolicySelectable = (policy: Policy): boolean => {
  const latest = getLatestVersion(policy);
  // Requirement: "If there is only one version of that policy and it's in processing or field state... user cannot select manually, hence remains disabled."
  if (policy.versions.length === 1 && latest.status !== 'active') {
    return false;
  }
  return true;
};

const getStatusColor = (status: PolicyStatus) => {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-50 border-green-200';
    case 'processing': return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'failed': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const getStatusIcon = (status: PolicyStatus) => {
  switch (status) {
    case 'active': return <CheckCircle2 className="w-4 h-4" />;
    case 'processing': return <AlertCircle className="w-4 h-4" />;
    case 'failed': return <XCircle className="w-4 h-4" />;
    default: return null;
  }
};


// --- Components ---

export const PolicySelector = () => {
  const [selectedPolicies, setSelectedPolicies] = useState<Record<string, string>>({}); // policyId -> versionId
  const [expandedCategories, setExpandedCategories] = useState<string[]>(MOCK_CATEGORIES.map(c => c.id)); // Default all open

  const toggleCategoryExpand = (id: string) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleCategorySelect = (category: Category) => {
    // Determine if we are selecting all or deselecting all
    // Check if all *selectable* policies in this category are already selected
    const selectablePolicies = category.policies.filter(isPolicySelectable);
    
    if (selectablePolicies.length === 0) return; // Nothing to select

    const allSelected = selectablePolicies.every(p => !!selectedPolicies[p.id]);

    const newSelection = { ...selectedPolicies };

    if (allSelected) {
      // Deselect all
      selectablePolicies.forEach(p => {
        delete newSelection[p.id];
      });
    } else {
      // Select all (default to latest)
      selectablePolicies.forEach(p => {
        const latest = getLatestVersion(p);
        newSelection[p.id] = latest.id;
      });
    }
    setSelectedPolicies(newSelection);
  };

  const handlePolicyToggle = (policy: Policy) => {
    if (!isPolicySelectable(policy)) return;

    const newSelection = { ...selectedPolicies };
    if (newSelection[policy.id]) {
      delete newSelection[policy.id];
    } else {
      const latest = getLatestVersion(policy);
      newSelection[policy.id] = latest.id;
    }
    setSelectedPolicies(newSelection);
  };

  const handleVersionChange = (policyId: string, versionId: string) => {
    setSelectedPolicies(prev => ({
      ...prev,
      [policyId]: versionId
    }));
  };

  // Checkbox states for category
  const getCategoryCheckboxState = (category: Category) => {
    const selectablePolicies = category.policies.filter(isPolicySelectable);
    if (selectablePolicies.length === 0) return false;

    const selectedCount = selectablePolicies.filter(p => !!selectedPolicies[p.id]).length;
    
    if (selectedCount === 0) return false;
    if (selectedCount === selectablePolicies.length) return true;
    return 'indeterminate';
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Select Policies</h1>
          <p className="text-gray-500 mt-2">Choose policies and their versions to proceed.</p>
        </div>

        <div className="space-y-4">
          {MOCK_CATEGORIES.map(category => (
            <div key={category.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
              {/* Category Header */}
              <div className="flex items-center gap-4 p-4 bg-gray-50/50 border-b">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 shrink-0"
                  onClick={() => toggleCategoryExpand(category.id)}
                >
                  {expandedCategories.includes(category.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>

                <Checkbox 
                  checked={getCategoryCheckboxState(category)}
                  onCheckedChange={() => handleCategorySelect(category)}
                  className="shrink-0"
                />
                
                <span 
                  className="font-medium text-lg cursor-pointer flex-1"
                  onClick={() => toggleCategoryExpand(category.id)}
                >
                  {category.name}
                </span>
                
                <Badge variant="secondary" className="bg-white">
                  {category.policies.length} Policies
                </Badge>
              </div>

              {/* Policies List */}
              <AnimatePresence initial={false}>
                {expandedCategories.includes(category.id) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="divide-y">
                      {category.policies.map(policy => {
                        const isSelectable = isPolicySelectable(policy);
                        const isSelected = !!selectedPolicies[policy.id];
                        const selectedVersionId = selectedPolicies[policy.id];
                        
                        const latestVersion = getLatestVersion(policy);
                        
                        // Determine current version object to display
                        const currentVersion = selectedVersionId 
                          ? policy.versions.find(v => v.id === selectedVersionId) 
                          : latestVersion;
                        
                        // Highlight logic:
                        // 1. If not selectable (single version + failed/processing) -> Visual disabled state
                        // 2. If selected AND current version is processing/failed -> Warning highlight
                        // 3. If latest is processing/failed (even if not selected yet) -> visual hint?
                        
                        // Requirement: "If the latest version is in processing or failed state, we need to highlight that."
                        // Requirement: "If there is only one version of that policy and it's in processing or field state, we highlight that as well, but... user cannot select manually"

                        const isLatestProcessingOrFailed = ['processing', 'failed'].includes(latestVersion.status);
                        const isCurrentProcessingOrFailed = currentVersion && ['processing', 'failed'].includes(currentVersion.status);
                        
                        // Highlight if selected and current version is bad
                        // OR if not selectable (it is bad by definition)
                        const showWarning = (isSelected && isCurrentProcessingOrFailed) || !isSelectable;

                        return (
                          <div 
                            key={policy.id} 
                            className={cn(
                              "flex items-start md:items-center gap-4 p-4 hover:bg-gray-50 transition-colors",
                              showWarning && "bg-amber-50/30 hover:bg-amber-50/50",
                              !isSelectable && "opacity-60 bg-gray-50"
                            )}
                          >
                            <Checkbox 
                              checked={isSelected}
                              onCheckedChange={() => handlePolicyToggle(policy)}
                              disabled={!isSelectable}
                              className="mt-1 md:mt-0"
                            />

                            <div className="flex-1 space-y-2 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
                              <div className="space-y-1">
                                <div className="font-medium flex items-center gap-2">
                                  {policy.name}
                                  {showWarning && (
                                    <span className="inline-flex items-center text-amber-600 text-xs font-normal">
                                      <AlertTriangle className="w-3 h-3 mr-1" />
                                      { !isSelectable ? "Unavailable" : "Attention Needed" }
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Latest: v{latestVersion.version}
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                {/* Version Selector */}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="h-8 w-[140px] justify-between"
                                      disabled={!isSelected || policy.versions.length <= 1}
                                    >
                                      <span className="truncate">
                                        v{currentVersion?.version}
                                      </span>
                                      <ChevronDown className="h-3 w-3 opacity-50" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-[200px]">
                                    {policy.versions.map(v => (
                                      <DropdownMenuItem 
                                        key={v.id}
                                        onClick={() => handleVersionChange(policy.id, v.id)}
                                        className="flex items-center justify-between"
                                      >
                                        <span>v{v.version}</span>
                                        <div className="flex items-center gap-2">
                                          <span className={cn(
                                            "text-xs px-1.5 py-0.5 rounded capitalize",
                                            getStatusColor(v.status)
                                          )}>
                                            {v.status}
                                          </span>
                                          {selectedVersionId === v.id && <CheckCircle2 className="w-3 h-3 text-primary" />}
                                        </div>
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Status Badge */}
                                <div className={cn(
                                  "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                  getStatusColor(currentVersion?.status || 'active')
                                )}>
                                  {getStatusIcon(currentVersion?.status || 'active')}
                                  <span className="capitalize">{currentVersion?.status}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        {/* Footer / Actions */}
        <div className="sticky bottom-6 flex justify-end gap-4">
          <Button 
            className="shadow-lg" 
            size="lg"
            disabled={Object.keys(selectedPolicies).length === 0}
            onClick={() => console.log('Selected:', selectedPolicies)}
          >
             Proceed with {Object.keys(selectedPolicies).length} Selection{Object.keys(selectedPolicies).length !== 1 && 's'}
          </Button>
        </div>
      </div>
    </div>
  );
};

