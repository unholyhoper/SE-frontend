/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'navigation-features.level.1',
        title: 'Task / Jobs',
        icon: 'mat_solid:batch_prediction',
        type: 'collapsable',
        children: [
            {
                id: 'Level 1.1',
                title: 'Batch configuration',
                type: 'basic',
                link: '/batch-config'
            },
            {
                id: 'Level 1.2',
                title: 'Batch jobs',
                type: 'basic',
                link: '/batch-jobs'
            },
            {
                id: 'Level 1.3',
                title: 'Launch batch job',
                type: 'basic',
                link: '/launch-batch-job'
            }
        ]
    },
    {
        id: 'navigation-features.level.2',
        title: 'Policies & Propositions',
        icon: 'iconsmind:money_2',
        type: 'collapsable',
        children: [
            {
                id: 'Level 2.1',
                title: 'Policies',
                type: 'basic',
                link: '/solife/policies'
            },
            {
                id: 'Level 2.1',
                title: 'Propositions',
                type: 'basic',
                link: '/solife/propositions'
            },
        ]
    }
];
export const compactNavigation = defaultNavigation;
export const futuristicNavigation = defaultNavigation;
export const horizontalNavigation = defaultNavigation;
