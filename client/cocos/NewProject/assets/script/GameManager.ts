import {
    _decorator,
    Component,
    Node,
    Vec3,
    tween,
    Sprite,
    Texture2D,
    SpriteFrame,
    instantiate,
    Button,
} from 'cc';
const { ccclass, property } = _decorator;
import { playerC } from './player'; 
import { Network } from './utils/Network';
@ccclass('GameManager')
export class GameManager extends Component {

    @property(playerC)
    private player: playerC | null = null;

    @property(Button)
    StartButton:Button |null = null;


    @property(Node)
    deckNode: Node = null; // 发牌堆节点

    @property([Node])
    playerNodes: Node[] = []; // 玩家位置节点数组

    @property(Node)
    cardPrefab: Node = null; // 扑克牌预制体

    @property(Texture2D)
    cardBackTexture: Texture2D = null; // 牌背纹理

    @property([Texture2D])
    cardTextures: Texture2D[] = []; // 扑克牌正面纹理数组

    cardsPerPlayer: number = 5; // 每位玩家的发牌数量

    private  gameResult:any= {}
    async start() {
        this.StartButton.node.on('click', this.startGame, this);
       
    }

    async startGame(){
        this.clearGame()
        await  this.getResult()
        this.startDealCards();
    }     
    async startDealCards() {
        const dealDuration = 0.5; // 发牌动画时长
        for (let i = 0; i < this.cardsPerPlayer; i++) {
            for (let j = 0; j < this.playerNodes.length; j++) {
                const playerNode = this.playerNodes[j];
                const delay = (i * this.playerNodes.length + j) * dealDuration;
                setTimeout(async() => {
                    // 创建扑克牌节点
                    const cardNode = this.createCard();
                    this.node.addChild(cardNode);
                    // 每次发牌时设置卡牌的目标位置
                    let x = playerNode.worldPosition.x - 800 + (i * 80)
                    let y =  playerNode.worldPosition.y - 300
                    if(j== 1){
                        x=  playerNode.worldPosition.x - 700 + (i * 80)
                         y =  playerNode.worldPosition.y - 330
                    }else if (j ==3){
                        x=  playerNode.worldPosition.x - 900 + (i * 80) 
                        y =  playerNode.worldPosition.y - 330
                    }
                    const targetPosition = new Vec3(x,y, playerNode.worldPosition.z);  // 偏移值确保卡牌不重叠
                    // 发牌动画
                    this.dealCard(cardNode, targetPosition, dealDuration);
                 
                    let card = 0
                    if(j == 0){
                        card = this.gameResult.Dealer.cards[i].id
                    }else if(j == 1){
                        card = this.gameResult.Player1.cards[i].id
                    }
                    else if(j == 2){
                        card = this.gameResult.Player2.cards[i].id
                    }

                    else if(j == 3){
                        card = this.gameResult.Player3.cards[i].id
                    }
                    // 更新卡牌正面纹理（测试逻辑，仅示例）
                    const cardTexture = this.cardTextures[card - 1];
                    await  setTimeout(() => {
                        this.flipCard(cardNode, cardTexture, 0.3); // 翻转动画

                        if(i == 4){
                            if(j == 0){
                                this.player.setResult(0,this.gameResult.Dealer.hand_type + this.gameResult.Dealer.)
                            }else if(j == 1){
                                this.player.setResult(1,this.gameResult.Player1.hand_type)
                            }
                            else if(j == 2){
                                this.player.setResult(2,this.gameResult.Player2.hand_type)
                            }
                            else if(j == 3){
                                this.player.setResult(3,this.gameResult.Player3.hand_type)
                            }
                        }
                   
                    }, dealDuration * 1000);
             
                }, delay * 1000);
              
            }
        }
    }
    

    createCard(): Node {
    const cardNode = instantiate(this.cardPrefab); // 实例化扑克牌预制体
    const sprite = cardNode.getComponent(Sprite);
    if (!sprite) {
        console.error('CardPrefab 节点上缺少 Sprite 组件！');
        return null;
    }

    // 设置牌背纹理
    const spriteFrame = new SpriteFrame();
    spriteFrame.texture = this.cardBackTexture;
    sprite.spriteFrame = spriteFrame;

    // 确保卡牌位置相对父节点设置
    cardNode.setPosition(Vec3.ZERO);  // 确保初始位置为父节点的局部坐标

    return cardNode;
    }
    dealCard(cardNode: Node, targetPosition: Vec3, duration: number) {
        // 发牌动画
        tween(cardNode)
            .to(duration, { position: targetPosition, scale: new Vec3(1, 1, 1) }, { easing: 'sineOut' })
            .call(() => {
                
            })
            .start();
    }
    flipCard(cardNode: Node, newTexture: Texture2D, duration: number) {
        const sprite = cardNode.getComponent(Sprite);

        // 创建正面纹理的 SpriteFrame
        const newSpriteFrame = new SpriteFrame();
        newSpriteFrame.texture = newTexture;

        // 翻转动画
        tween(cardNode)
            .to(duration / 2, { scale: new Vec3(0, 1, 1) }) // 横向缩小至 0
            .call(() => {
                sprite.spriteFrame = newSpriteFrame; // 设置正面纹理
            })
            .to(duration / 2, { scale: new Vec3(1, 1, 1) }) // 恢复正常大小
            .start();
    }
    async getResult(){
       await Network.get('http://localhost:8080/start').then(res=>{
            this.gameResult = res.game_results
        })
    }
    clearGame(){
        this.playerNodes.forEach((item,index)=>{
            this.player.setResult(index,'')
            this.node.children.forEach(child => {
                if (child.name === "Sprite") {
                    child.destroy();  // 销毁指定节点
                }
            });
            
        })
    }
}
