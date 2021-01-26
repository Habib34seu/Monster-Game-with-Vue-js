new Vue({
    el:'#app',
    data:{
        palyerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        truns:[]
    },
    methods:{
        startGame:function(){
            this.gameIsRunning= true;
            this.palyerHealth=100;
            this.monsterHealth=100;
            this.truns=[];
        },
        attack:function(){
           var damage=this.calculateDamage(10,3);
            this.monsterHealth -=damage;
            this.truns.unshift({
                isPlayer:true,
                text:'Player hits monster for '+damage,
            });
             if(this.checkWin()){
                 return;
             }
            this.monsterAttacks();
        },
        specialAttack:function(){
            var damage = this.calculateDamage(20,10);
            this.monsterHealth -=damage;
            this.truns.unshift({
                isPlayer:true,
                text:'Player hits Monster Hard for '+damage,
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },

        heal:function(){
            if(this.palyerHealth<=90){
                this.palyerHealth+=10;
            }else{
                this.palyerHealth=100;
            }
            this.truns.unshift({
                isPlayer:true,
                text:'Player Heals for 10',
            });
            this.monsterAttacks();
        },

        giveUp:function(){
            this.gameIsRunning=false;
        },
        monsterAttacks:function(){
            var damage =  this.calculateDamage(12,5);
            this.palyerHealth -=damage;
            this.checkWin();
            this.truns.unshift({
                isPlayer:false,
                text:'Monster hits player for '+damage,
            });
        },
        calculateDamage:function(max,min){
            return Math.max(Math.floor(Math.random() * max) +1,min);
        },
        checkWin:function(){
            if(this.monsterHealth <=0){
                if(confirm('You Won !! New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning= false;
                }
                return true;
            }else if(this.palyerHealth <=0){
                if(confirm('You Lost !! New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning= false;
                }
                return true;
            }
            return false;
        }


    }
});