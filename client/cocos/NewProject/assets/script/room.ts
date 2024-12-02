import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { playerC } from './player';  // 导入 playerC 组件
import { Network } from './utils/Network';

/**
 * 游戏房间逻辑
 * 内部娱乐使用
 * 1）点击开始游戏
 * 2）进入房间，随机匹配玩家或者生成机器人玩家，创建私人房间，根据房号进入
 * 3）选择一个玩家是庄家，或者竞争
 * 4）开始游戏
 * 
 * 
 */
@ccclass('room')
export class room extends Component {

    // 通过 property 装饰器将 playerC 组件实例绑定到 room 节点中
    @property(playerC)
    private player: playerC | null = null;

    start() {
       this.getRoomInfo()
    }

    async  getRoomInfo (){
        // setTimeout(()=>{
        //     this.setNodeActive(2)
        // },2000)
        // setTimeout(()=>{
        //     this.setNodeActive(3)
        // },4000)


        // setTimeout(() => {
            
        // }, 10000);
    }

    // setNodeActive(site){
    //     this.player.setNodeActive(site)
    // }
    
}
