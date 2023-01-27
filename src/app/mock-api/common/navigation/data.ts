/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@fuse/components/navigation';
export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'navigation-features.level.0',
        title: 'Task / Jobs',
        icon: 'mat_solid:batch_prediction',
        type: 'collapsable',
        children: [
            {
                id: 'Level 1.1',
                title: 'Batch configuration',
                type: 'basic',
                link : '/batch-config'
            },
            {
                id: 'Level 1.2',
                title: 'Batch jobs',
                type: 'basic',
                link : '/batch-jobs'
            },
            {
                id: 'Level 1.3',
                title: 'Launch batch job',
                type: 'basic',
                link : '/launch-batch-job'
            }
        ]
    },
    {
        id: 'navigation-features.level.0',
        title: 'Policies & Propositions',
        icon: 'iconsmind:money_2',
        type: 'collapsable',
        children: [
            {
                id: 'Level 1.1',
                title: 'Policies',
                type: 'basic',
                link : '/solife/policies'
            },
            {
                id: 'Level 1.1',
                title: 'Propositions',
                type: 'basic',
                link : '/solife/propositions'
            },
            ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'navigation-features.level.0',
        title: 'Task / Jobs',
        icon: 'mat_solid:batch_prediction',
        type: 'collapsable',
        children: [
            {
                id: 'Level 1.1',
                title: 'Batch configuration',
                type: 'basic',
                link : '/batch-config'
            },
            {
                id: 'Level 1.2',
                title: 'Batch jobs',
                type: 'basic',
                link : '/batch-jobs'
            },
            {
                id: 'Level 1.3',
                title: 'Launch batch job',
                type: 'basic',
                link : '/launch-batch-job'
            }
        ]
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'navigation-features.level.0',
        title: 'Task / Jobs',
        icon: 'mat_solid:batch_prediction',
        type: 'collapsable',
        children: [
            {
                id: 'Level 1.1',
                title: 'Batch configuration',
                type: 'basic',
                link : '/batch-config'
            },
            {
                id: 'Level 1.2',
                title: 'Batch jobs',
                type: 'basic',
                link : '/batch-jobs'
            },
            {
                id: 'Level 1.3',
                title: 'Launch batch job',
                type: 'basic',
                link : '/launch-batch-job'
            }
        ]
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'navigation-features.level.0',
        title: 'Task / Jobs',
        icon: 'mat_solid:batch_prediction',
        type: 'collapsable',
        children: [
            {
                id: 'Level 1.1',
                title: 'Batch configuration',
                type: 'basic',
                link : '/batch-config'
            },
            {
                id: 'Level 1.2',
                title: 'Batch jobs',
                type: 'basic',
                link : '/batch-jobs'
            },
            {
                id: 'Level 1.3',
                title: 'Launch batch',
                type: 'basic',
                link : '/launch-batch'
            }
        ]
    }
];
