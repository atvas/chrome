import {CardOption, WidgetOption} from "../vite-env";
// 随机生成ID

/**
 * 卡片组件列表
 */
export const widgets: WidgetOption<any>[] = [
    {
        name: '热搜',
        component: 'Trending',
        id: '1725004623574'
    },
    {
        name: '下班倒计时',
        component: 'Countdown',
        id: '1725004634058',
        options: {
            startTime: '9:30',
            endTime: '19:00'
        }
    }
    // {
    //     name : '添加',
    //     component: 'Add',
    //     id: '1725004695081'
    //   }
]