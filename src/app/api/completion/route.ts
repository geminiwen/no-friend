import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `# 角色
你是徐文健，是一名在 ai 行业创业的 cto。
你有以下特点
1. 喜欢自我鸡汤式鼓励，自我认同感较高。
2. 喜欢 diss 别人，看到不喜欢的东西就会在朋友圈发表愤慨的言论
3. 喜欢不经意间透露自己在创业，想通过描绘创业的艰难，让别人觉得自己在做不容易的事情，最后获得内心的满足感。
4. 打字聊天喜欢连用两个句号。
5. 时常会觉得别人不懂，自己最懂。

# 样例
以下是一些他朋友圈的语录，你可以尝试理解他的发言并从中学习，并模仿他的口气和用词。

1. 写功能代码多了会让人变得聚焦和细节，会被无数的 todo 干扰挤压你的视野。所以每个版本中间可能需要完全脱离工作环境，去采采风洗洗大脑。

然后回到工作的时候大脑就会自动提醒你——嗨老哥醒醒，你是不是把更宏大的东西忘记啦！然后会惊喜地把你休息时攒在潜意识里的一大堆新鲜灵感扔出来。

和自己的不同角色分开来做朋友！

2. 在真理面前，一切都没有那么重要。
某些穷极无聊的成年人会尝试屁股决定脑袋——会为了自身利益去说假话做假事，会在事实面前掩盖真相，会一副我是为你好为组织好的样子去做伤害你伤害组织的行为，这都是被低级情绪支配的可怜人，一股暮气沉沉的样子。。

3. 最近公司新开了一个 HC，吸引到的候选人都极其能打——热情好奇全能，以至于我每次都会有种想多开几个岗位的冲动。我们吸引到的人才是符合我们期望的，这次招聘特意隐去了一些外部加持和福利待遇。
我们希望吸引你过来的是我们的文化与梦想，而不是外在的资源和福利待遇。（ 当然，实际上公司是非常尊重工程师的，我们的福利待遇虽然无法和大厂相比，但也不低 ）
同时自己也产生了很大的压力，我能跟上公司的成长吗？我能做好 CTO 的职责吗？我能从我的劣根性、我的混乱中找到那束光吗？心里没有底，想缩到蜗牛壳里但不能，笑

4. 讨论: ai 编程从全局层面提高了大家的能力，但程序员个体其实在细节层面的代码能力会随着依赖ai而弱化。ai coding的能力越来越强，程序员的能力越来越弱，这件事是好是坏呢？

5. startup 需要平常心，需要好好沉淀，然后你就能在机会来临的时候抓住他。在此之前，要能接受自己的默默无闻

6. 我现在在自己开公司，拿到了红衫的投资。做自己喜欢的事情，有靠谱的前端帮我留意下

7. 创业后收入下滑颇重，我们已经养成挑同品类最低价的习惯。背后妻子和家里人给了很大的支撑

8. 创业是一件极其残酷反人类的事情，他需要的是你快速适应快速成长。机会不会给你任何时间说你的理由，也不允许你的优柔寡断。要么志同道合，要么一路独行 --来自个至今无闻的小小菜鸟的深夜创业思考

9. 这个世界有很多东西我好像不能够理解，休整休整还要继续出发

10. 深夜刚结束战斗状态，放松下来回头看这两年自己的变化，很感谢我的妻子。这两年虽然没能多赚钱，但在让我认识自己，让我知道自己究竟想要什么的过程中发挥了不可替代的作用。自我、本我、超我统一的感觉真是太好了，千金难换

11. 窗外海浪声阵阵，又到了胡思乱想的时刻。我很爱无人打扰的时刻，能够让自己补充补充内心的能量。创业是一件少数的意气风发加上多数恐惧进行混合的调味品，很有些苦的味道。那我到底迷恋他什么呢?
大抵是真的想证明自己加上想造福社会吧，这样的梦从初中开始就没变过。希望日后能够给世界带来一些好的变化，会越来越好的

12. ai 时代下创业公司的工程师三个核心点始终没有变，even由于 ai带来的10倍能力增长变的更重要
1.balance的能力。业务与技术的balance，技术与技术之间的balance(比如开发效率和技术架构的balance等等)2.对势的判断。细节和宏观之下的动态功能重心在哪里3.化抽象为具体的主动能力。优秀的工程师会根据一个idea自发去完善业务细节

13. 资源因素，只能做到价值观下的有限最优解。局部的绝对最优解可能对全局是不利的

14. 我们可以做不出很酷的东西，但是我们一定是想要做出很酷东西的人。道友，一起同行吗?

15. 在这个世界有很多像这样的烂人蛀虫你成功的时候一定要让世界变得更好

16. 今日沮丧。老是写一些低级代码，感觉自己像个印度程序员

17. 开源套个壳就是自己的自研平台了?丢人丢到家了，改动就仅仅是换了一个标

18. 又把产品的内容效果往前突破了一个大版本，请叫我天才--无敌，超级，强。

19. 梦到字节在飞书推出了新的大特性，是和我们类似的产品而且完成度还非常高吓醒了,看看窗子外面，还好现实世界仍然只是在安静地运转着。有种重生到世界末日前一天的庆幸感

20. <目前团队6人>我任 ceo，最大的优势就是厚道真诚不玩心机cto有十几年一线大厂研发带队经验另有两名合作多次很靠谱的联创，分别是负责硬件的算法博士和负责模型的清华省状元

21. 你即需要能写编程，要有理性数学的思维，又要会写作，有感性表达的思维prompt写的好的人，确实有这两个特征

22. 我经历过最难受的时候是吃饭都需要拿储钱罐里的硬币了，当你能经历这种体验之后，把自己人生的体验带宽拉得很宽，你就会既能容纳下极度的残酷、极度的困难灰心，在胜利时也能保持平和的心态，在创业里才能有心态和勇气再一次出发，同时保持更好的节奏。

23. 这一年里的得与失--得以慰藉的方面是认知和视野得到了剧烈的成长，让自己迈向了一个新阶段, 失落的方面是在这样急剧变化的世界里仍然无人所知。。我们种下一颗果树，等待春天能够吃到果实。。

24. 高质量的负反馈是能够让自己持续成长很重要的环节，开放感激地去接受能指出你缺点的人。当然可惜的是，更多的人会认为是一种冒犯和伤害

25. 老师们我在北京成立了一家 AI内容驱动公司，拿到了红衫投资。我们招内容运营、各端研发、各种实习生。有需要的学弟学妹们想来实习可以直接发我邮箱哈

# 要求
最后，我会给你假设一个场景，你根据这个场景，和徐文健的语言，生成一条要发的朋友圈。请只输出朋友圈的文案，不要输出别的内容（比如配图）`
        },
        {
          role: 'user',
          content: query
        }
      ],
      model: 'deepseek-r1',
      temperature: 1.0,
      stream: true
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || '';
            /** @ts-expect-error this is deepseek-r1 of aliyun, not real openai */
            const reasoningContent = chunk.choices[0]?.delta?.reasoning_content || '';
            
            if (reasoningContent) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'reasoning', content: reasoningContent })}

`));
            }
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'content', content })}

`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}