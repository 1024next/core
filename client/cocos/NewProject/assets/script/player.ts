import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerC')
export class playerC extends Component {

    @property(Node)
    Node1:Node |null = null;
    @property(Node)
    Node2:Node |null = null;
    @property(Node)
    Node3:Node |null = null;
    @property(Node)
    Node4:Node |null = null;


    @property(Label)
    username1:Label | null = null
    @property(Label)
    username2:Label | null = null
    @property(Label)
    username3:Label | null = null
    @property(Label)
    username4:Label | null = null

    @property(Label)
    balance1:Label | null = null
    @property(Label)
    balance2:Label | null = null
    @property(Label)
    balance3:Label | null = null
    @property(Label)
    balance4:Label | null = null

    start() {
    }

    setResult(index,value){
        this['balance' + (index + 1)].string = value
    }
    // setNodeActive(number){
    //     if(number == 2){
    //         this.Node2.active = true
    //          this.username2.string = '2号'
    //          this.balance2.string = '22222'
    //     }else if(number == 3){
    //         this.Node3.active = true
    //           this.username3.string = '3号'
    //           this.balance3.string = "19090"
    //     }
    // }
}


