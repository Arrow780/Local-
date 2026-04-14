export interface WeekData {
  week: number;
  words: string[];
}

export interface BookData {
  id: string;
  title: string;
  color: string;
  weeks: WeekData[];
}

export const wordLists: BookData[] = [
  {
    id: 'book1',
    title: '第一阶段 (启蒙)',
    color: 'bg-pink-400',
    weeks: [
      { week: 1, words: '人口大中小哭笑'.split('') },
      { week: 2, words: '一上下爸妈天太'.split('') },
      { week: 3, words: '月二地阳亮星云'.split('') },
      { week: 4, words: '火水三土山石木'.split('') },
      { week: 5, words: '我好有田牛羊聪'.split('') },
      { week: 6, words: '耳目心和四明头'.split('') },
      { week: 7, words: '眉鼻手花树五草'.split('') },
      { week: 8, words: '叶日风雨的孩六'.split('') },
      { week: 9, words: '白红是家多唱子'.split('') },
      { week: 10, words: '七爱爷奶少歌不'.split('') },
      { week: 11, words: '朋八宝在学书游'.split('') },
      { week: 12, words: '友儿九贝生习看'.split('') },
      { week: 13, words: '戏字气十会见早'.split('') },
      { week: 14, words: '雪鸡绿黄青鱼做'.split('') },
      { week: 15, words: '飞跑要吃鸟他们'.split('') },
      { week: 16, words: '春夏秋冬季都个'.split('') },
      { week: 17, words: '狗猫蓝落真开说'.split('') },
      { week: 18, words: '也马米哥姐来黑'.split('') },
    ],
  },
  {
    id: 'book2',
    title: '第二阶段 (初级)',
    color: 'bg-orange-400',
    weeks: [
      { week: 1, words: '去出跳着了你又'.split('') },
      { week: 2, words: '弟妹东就还快得'.split('') },
      { week: 3, words: '西乐到起玩捉迷'.split('') },
      { week: 4, words: '球很高鸭哈方爬'.split('') },
      { week: 5, words: '藏兴向对能叫变'.split('') },
      { week: 6, words: '问成再急教门只'.split('') },
      { week: 7, words: '回公打兔请过吗'.split('') },
      { week: 8, words: '泳虫把驮鹅河礼'.split('') },
      { week: 9, words: '背拿里后谢边貌'.split('') },
      { week: 10, words: '班幼园照婆甜梦'.split('') },
      { week: 11, words: '老盒尺刀时正文'.split('') },
      { week: 12, words: '具笔画长放用总'.split('') },
      { week: 13, words: '尾巴玉尖竹苗听'.split('') },
      { week: 14, words: '话猴猩给进告电'.split('') },
      { week: 15, words: '诉念饭乖想面住'.split('') },
      { week: 16, words: '前从同没送果工'.split('') },
      { week: 17, words: '厂产动关找按年'.split('') },
      { week: 18, words: '节桃荷菊梅冷它'.split('') },
      { week: 19, words: '怕躲勇敢堆仗柳'.split('') },
      { week: 20, words: '农民伯种最片吹'.split('') },
    ],
  },
  {
    id: 'book3',
    title: '第三阶段 (中级)',
    color: 'bg-green-400',
    weeks: [
      { week: 1, words: '浇燕睡醒蛙呱南椅坐身'.split('') },
      { week: 2, words: '吧桌布抱摔声谁呢认原'.split('') },
      { week: 3, words: '痛喊狼啦赶救假掉路碰'.split('') },
      { week: 4, words: '哪呀两逃走她点音可伸'.split('') },
      { week: 6, words: '缝夹根棍丢灰萝卜熟拔'.split('') },
      { week: 7, words: '拉鼠咕咚倒抬晚左右怎'.split('') },
      { week: 8, words: '么办知道午这座洞什害'.split('') },
      { week: 9, words: '付顶角死扑期带分清今'.split('') },
      { week: 11, words: '昨光阴错指拇食无名加'.split('') },
      { week: 12, words: '共事帮饿肚狮觉毛求等'.split('') },
      { week: 13, words: '香肉张网咬力啊牙嘴漂'.split('') },
      { week: 14, words: '胡虎贴才数更朵纸圆圈'.split('') },
      { week: 16, words: '亲脸眼睛接外笨以自己'.split('') },
      { week: 17, words: '慢难练每颗样因为离近'.split('') },
      { week: 18, words: '象船闪金美丽当扇满干'.split('') },
      { week: 19, words: '朝熊娃汽车北京往呜鹿'.split('') },
      { week: 21, words: '森林采蘑菇篮直摸苔所'.split('') },
      { week: 22, words: '科灯应该题停而窗刚撞'.split('') },
    ],
  },
  {
    id: 'book4',
    title: '第四阶段 (进阶)',
    color: 'bg-blue-400',
    weeks: [
      { week: 1, words: '比记串被够命颈定吓啄'.split('') },
      { week: 2, words: '破湖棵瓜透腿狐粗竿狸'.split('') },
      { week: 3, words: '跟钓甩钩忘装饵算桶坏'.split('') },
      { week: 4, words: '忙洗忽然全条怪物猪影'.split('') },
      { week: 6, words: '信呼结冰枝发抖暖屋法'.split('') },
      { week: 7, words: '件于松帽戴热候劳流汗'.split('') },
      { week: 8, words: '凉别整盖怜窝病受羽望'.split('') },
      { week: 9, words: '骑行远经旁婶呵稀奇祝'.split('') },
      { week: 11, words: '贺呦脑呆床闹钟拔准备其'.split('') },
      { week: 12, words: '实轻响迟已叠包碗写冒您'.split('') },
    ],
  },
];
