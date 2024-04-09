/*
 * @Author: 胖胖很瘦
 * @Date: 2024-03-03 15:47:10
 * @LastEditors: 胖胖很瘦
 * @LastEditTime: 2024-03-03 15:55:57
 */
import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';


export const tool = defineTool({
  name: translate('tools.curl-to-code.title'),
  path: '/curl-to-code',
  description: translate('tools.curl-to-code.description'),
  keywords: ['curl', 'to', 'code'],
  component: () => import('./curl-to-code.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2024-03-03'),
});

