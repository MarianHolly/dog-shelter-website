import { useState, useEffect } from 'react';

interface DogFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  size: string;
  gender: string;
  energy: string;
  goodWithKids: boolean;
  urgent: boolean;
}

function readFiltersFromURL(): FilterState {
  const params = new URLSearchParams(window.location.search);
  return {
    size: params.get('size') ?? '',
    gender: params.get('gender') ?? '',
    energy: params.get('energy') ?? '',
    goodWithKids: params.get('kids') === 'true',
    urgent: params.get('urgent') === 'true',
  };
}

function writeFiltersToURL(filters: FilterState) {
  const params = new URLSearchParams();
  if (filters.size) params.set('size', filters.size);
  if (filters.gender) params.set('gender', filters.gender);
  if (filters.energy) params.set('energy', filters.energy);
  if (filters.goodWithKids) params.set('kids', 'true');
  if (filters.urgent) params.set('urgent', 'true');
  const query = params.toString();
  history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
}

export default function DogFilters({ onFilterChange }: DogFiltersProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    size: '',
    gender: '',
    energy: '',
    goodWithKids: false,
    urgent: false,
  });

  useEffect(() => {
    const fromURL = readFiltersFromURL();
    setFilters(fromURL);
    document.dispatchEvent(new CustomEvent('dog-filter-change', { detail: fromURL }));
  }, []);

  const dispatch = (newFilters: FilterState) => {
    writeFiltersToURL(newFilters);
    document.dispatchEvent(new CustomEvent('dog-filter-change', { detail: newFilters }));
    onFilterChange?.(newFilters);
  };

  const updateFilter = (key: keyof FilterState, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    dispatch(newFilters);
  };

  const resetFilters = () => {
    const emptyFilters: FilterState = {
      size: '',
      gender: '',
      energy: '',
      goodWithKids: false,
      urgent: false,
    };
    setFilters(emptyFilters);
    dispatch(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '' && v !== false);

  return (
    <div className="bg-card rounded-xl border-2 border-border shadow-sm overflow-hidden">
      {/* Header with Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <h2 className="text-lg font-semibold">Filtre</h2>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
              Aktívne
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter Content */}
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Size Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-muted-foreground">Veľkosť:</label>
              <div className="flex gap-1.5">
                {[
                  { value: 'Malý', label: 'Malý', icon: '🐕' },
                  { value: 'Stredný', label: 'Stredný', icon: '🐕🐕' },
                  { value: 'Veľký', label: 'Veľký', icon: '🐕🐕🐕' },
                ].map(({ value, label, icon }) => (
                  <button
                    key={value}
                    onClick={() => updateFilter('size', filters.size === value ? '' : value)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      filters.size === value
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                    }`}
                    title={label}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-border hidden sm:block" />

            {/* Gender Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-muted-foreground">Pohlavie:</label>
              <div className="flex gap-1.5">
                {[
                  { value: 'Pes', icon: '♂' },
                  { value: 'Suka', icon: '♀' },
                ].map(({ value, icon }) => (
                  <button
                    key={value}
                    onClick={() => updateFilter('gender', filters.gender === value ? '' : value)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      filters.gender === value
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-border hidden sm:block" />

            {/* Energy Level Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-muted-foreground">Energia:</label>
              <div className="flex gap-1.5">
                {[
                  { value: 'Nízka', emoji: '😌', desc: 'Pokojný, málo pohybu' },
                  { value: 'Stredná', emoji: '🐕', desc: 'Bežná aktivita' },
                  { value: 'Vysoká', emoji: '⚡', desc: 'Veľa pohybu a aktivity' },
                ].map(({ value, emoji, desc }) => (
                  <div key={value} className="group relative">
                    <button
                      onClick={() => updateFilter('energy', filters.energy === value ? '' : value)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        filters.energy === value
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                      }`}
                      title={value}
                    >
                      {emoji}
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none whitespace-nowrap z-50 border border-border">
                      <div className="font-semibold">{value}</div>
                      <div className="text-muted-foreground">{desc}</div>
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                        <div className="border-4 border-transparent border-t-popover" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-border hidden sm:block" />

            {/* Toggles */}
            <div className="flex items-center gap-2">
              {/* Good with Kids Toggle */}
              <button
                onClick={() => updateFilter('goodWithKids', !filters.goodWithKids)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium ${
                  filters.goodWithKids
                    ? 'bg-primary/10 border border-primary text-primary'
                    : 'bg-muted hover:bg-muted/80 border border-transparent text-muted-foreground'
                }`}
              >
                <span>👶</span>
                <span className="hidden lg:inline">S deťmi</span>
              </button>

              {/* Urgent Toggle */}
              <button
                onClick={() => updateFilter('urgent', !filters.urgent)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium ${
                  filters.urgent
                    ? 'bg-destructive/10 border border-destructive text-destructive'
                    : 'bg-muted hover:bg-muted/80 border border-transparent text-muted-foreground'
                }`}
              >
                <span>⚡</span>
                <span className="hidden lg:inline">Urgentné</span>
              </button>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <>
                <div className="h-6 w-px bg-border hidden sm:block" />
                <button
                  onClick={resetFilters}
                  className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium text-sm flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span className="hidden sm:inline">Zrušiť</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
