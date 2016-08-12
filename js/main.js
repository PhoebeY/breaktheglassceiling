var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

var field;

var enemies;

var globalList = []

var globallives = 7;

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

function listener(a, b) {

    console.log(a, b)

}

var timeout = false;
var positiveScoreTimeout = false;

//////////////////////////////////////////////////////////

game.MenuScreen = function() {};

game.MenuScreen = {
    preload: function() {
        this.load.image('menu', 'assets/images/logo.png');
    },
    create: function() {
        game.stage.backgroundColor = "#330033";
        this.menu = this.game.add.sprite(440, 280, 'menu');
        this.menu.anchor.setTo(0.5, 0.5);
        this.menu.scale.setTo(0.6);
        this.menu.inputEnabled = true;
        //this.menu.events.onInputOver.add(listener, this);

        var style = {
            font: "bold 20px Courier New",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        clicktostart = game.add.text(0, 0, "--Click to start your journey--", style);
        clicktostart.anchor.setTo(0.5, 0.5);
        clicktostart.setTextBounds(190, 530, 800, 100);

    },
    update: function() {
        if (game.input.activePointer.isDown) {
            game.state.start('prequote');
        }
    },
};

game.prequote = function() {};

game.prequote = {
    preload: function() {
    },
    create: function() {
        game.stage.backgroundColor = "#330033";
        
        var style = {
            font: "bold 20px Courier New",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        clicktostart = game.add.text(0, 0, "Remember...", style);
        clicktostart.anchor.setTo(0.5, 0.5);
        clicktostart.setTextBounds(300, 300, 800, 100);

    },
    update: function() {
        if (game.input.activePointer.isDown) {
            game.state.start('quote');
        }
    },
};


game.quote = function() {};

game.quote = {
    preload: function() {
        this.load.image('quote', 'assets/images/quote.png');
    },
    create: function() {
        game.stage.backgroundColor = "#330033";
        this.menu = this.game.add.sprite(400, 280, 'quote');
        this.menu.anchor.setTo(0.5, 0.5);
        this.menu.scale.setTo(0.2);
        this.menu.inputEnabled = true;
        //this.menu.events.onInputOver.add(listener, this);

        var style = {
            font: "bold 20px Courier New",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        clicktostart = game.add.text(0, 0, "--Click to Start Game--", style);
        clicktostart.anchor.setTo(0.5, 0.5);
        clicktostart.setTextBounds(130, 530, 800, 100);

    },
    update: function() {
        if (game.input.activePointer.isDown) {
            game.state.start('Level1');
        }
    },
};

////////////////////// LEVEL / 1 //////////////////////////////

game.Level1 = function() {};

game.Level1 = {
    preload: function() {
        this.load.image('girl1', 'assets/images/heroSpriteLvl1.png');
        this.load.image('ladder', 'assets/images/ladders.png');
        this.load.image('enemy', 'assets/images/boi1.png');
        this.load.image('enemy2', 'assets/images/boi3.png');
        this.load.image('enemy3', 'assets/images/boi4.png');
        this.load.image('enemy4', 'assets/images/boi2.png');


    },
    create: function() {
        // game.physics.p2.updateBoundsCollisionGroup();

        game.stage.backgroundColor = "#0F5454";
        field = game.add.tileSprite(-240, 0, 800, 600, "ladder");
        field.scale.x = (1.6);

        this.girl1 = this.game.add.sprite(350, 450, 'girl1');
        this.girl1.anchor.setTo(0.5, 0.5);
        this.girl1.scale.setTo(0.3);
        // this.girl1.body.collides(enemyCollisionGroup)


        var listEnemy = ["enemy", "enemy2"]
        var listEnemy2 = ["enemy3", "enemy4"]


        var generate = 300;
        var baseTimer1 = 0;
        var baseTimer2 = 0;

        for (i = 0; i < generate; i++) {
            var lst = i % 2 ? listEnemy : listEnemy2;
            var left = i % 2 ? true : false;
            var randomEnemy = lst[Math.round(Math.random() * (lst.length - 1))]

            //Adjust timing
            game.time.events.add(baseTimer1 += Math.min(Math.random() * 1 * Phaser.Timer.SECOND, Phaser.Timer.SECOND * 1.4), function(j, lft) {
             

                var rand = 300;
                console.log(lft)
                //Don't appear on the inside of the ladder.
                if (lft) {

                    while ((rand < 800 && rand > 218) || (rand < 140 && rand > 0))
                        rand = Math.random() * 800;
                } else {
                    while ((rand < 500 && rand > 0) || (rand < 800 && rand > 720))
                    rand = Math.random() * 800;
                }




                var spr = game.add.sprite(rand, -100, j);
                var size = Math.max(Math.random() * 0.42, 0.41)
                spr.anchor.setTo(0.5, 0.5);
                spr.scale.setTo(size);

                globalList.push(spr);
            }, this, randomEnemy, left);
        }

        // for (i = 0; i < generate; i++) {
        //     var randomEnemy = listEnemy2[Math.round(Math.random() * (listEnemy2.length - 1))]

        //     //Adjust timing of list 2
        //     game.time.events.add(baseTimer2 += Math.min(Math.random() * 1 * Phaser.Timer.SECOND, Phaser.Timer.SECOND * 0.9), function(j) {
        //         console.log(listEnemy2, j)



        //         //Don't appear on the inside of the ladder.
        //         var rand = 300;
        //         while ((rand < 500 && rand > 0) || (rand < 800 && rand > 720))
        //             rand = Math.random() * 800;



        //         var spr = game.add.sprite(rand, -100, j);

        //         var size = Math.max(Math.random() * 0.42, 0.41)

        //         spr.anchor.setTo(0.5, 0.5);
        //         spr.scale.setTo(size);

        //         globalList.push(spr);
        //     }, this, randomEnemy);
        // }


        var me = this;
        // me.game.stage.backgroundColor = '#16a085';
        //Keep track of the users score
        me.score = 0;
        me.scoreBuffer = 0;
        // globallives= 5;
        me.livesBuffer = 0;
        //Create the score label
        me.createScore();

    },
    createScore: function() {

        var me = this;
        var scoreFont = "80px Arial";
        var livesFont = "40px Arial";

        //Create the score label
        me.scoreLabel = me.game.add.text(me.game.world.centerX, 480, "0", {
            font: scoreFont,
            fill: "#ffffff",
            stroke: "#535353",
            strokeThickness: 15
        });
        me.scoreLabel.anchor.setTo(0.5, 0);
        me.scoreLabel.align = 'center';

        //Create a tween to grow / shrink the score label
        me.scoreLabelTween = me.add.tween(me.scoreLabel.scale).to({
            x: 1.5,
            y: 1.5
        }, 200, Phaser.Easing.Linear.In).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Linear.In);

        me.livesLabel = me.game.add.text(me.game.world.centerX, 40, "Lives: " + globallives, {
            font: livesFont,
            fill: "#ffffff",
            stroke: "#535353",
            strokeThickness: 5

        });
        me.livesLabel.anchor.setTo(0.5, 0);
        me.livesLabel.align = "center";

        me.livesLabelTween = me.add.tween(me.livesLabel.scale).to({
            x: 1.5,
            y: 1.5
        }, 200, Phaser.Easing.Linear.In).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Linear.In);


    },


    update: function() {


        for (i = 0; i < globalList.length; i++) {
            var entry = globalList[i];
            //Change speed
            entry.y += 7;
            if (this.girl1.overlap(entry)) {
                if (!timeout) {
                    timeout = true;
                    setTimeout(function() {
                        timeout = false;

                    }, 1000)
                    this.decrementLives();
                    this.createScoreAnimationNegative(this.girl1.x, this.girl1.y, -1, 0);
                }

            }
        }


        if (!positiveScoreTimeout) {
            positiveScoreTimeout = true;
            setTimeout(function() {
                positiveScoreTimeout = false;
            }, 1500)
            this.scoreBuffer += 1
            this.livesBuffer -= 1
                // this.createScoreAnimation(this.girl1.x, this.girl1.y, '+' + 2, 2);
        }


        field.tilePosition.y += 2;
        var cursors = cursors = game.input.keyboard.createCursorKeys();

        if (cursors.left.isDown && this.girl1.x > 290) {
            this.girl1.x -= 4;
            // this.girl1.body.moveLeft(200);
            this.girl1.scale.x = -(0.3);
        } else if (cursors.right.isDown && this.girl1.x < 530) {
            this.girl1.x += 4;
            // this.girl1.body.moveRight(200);
            this.girl1.scale.x = (0.3);
        }


        console.log(this.score, this.scoreBuffer)

        var me = this;
        if (me.scoreBuffer > 0) {
            me.incrementScore();
            me.scoreBuffer--;
        }
        // if (me.scoreBuffer < 0) {
        //     me.decrementScore();
        //     me.scoreBuffer++;
        // }
        if (me.score == 15) {
            // game.state.end('Level1')
            globalList = [];
            console.log(globalList);
            game.state.start('Level1to2Screen');
        }
        if (globallives== 0) {
            globalList = [];
            game.state.start('EndGame');

        }
    },

    incrementScore: function() {

        var me = this;
        //Increase the score by one and update the total score label text
        me.score += 1;
        me.scoreLabel.text = me.score;
    },
    decrementLives: function() {

        var me = this;
        //Increase the score by one and update the total score label text
        globallives-= 1;
        me.livesLabel.text = "Lives: " + globallives;
    },

    createScoreAnimationNegative: function(x, y, message, score) {

        var me = this;

        var livesFont = "35px Arial";

        //Create a new label for the score
        var livesAnimation = me.game.add.text(x, y, message, {
            font: livesFont,
            fill: "#39d179",
            stroke: "#ffffff",
            strokeThickness: 5
        });
        livesAnimation.anchor.setTo(0.5, 0);
        livesAnimation.align = 'center';

        //Tween this score label to the total score label
        var livesTween = me.game.add.tween(livesAnimation).to({
            x: me.game.world.centerX,
            y: 90
        }, 800, Phaser.Easing.Exponential.In, true);

        //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
        livesTween.onComplete.add(function() {
            livesAnimation.destroy();
            me.livesLabelTween.start();
            me.livesBuffer -= globallives;
        }, me);
    },
};


////////////////////////// LEVEL / 2 ////////////

game.Level2 = function() {};

game.Level2 = {
    preload: function() {
        this.load.image('girl2', 'assets/images/heroSpriteLvl2.png');
        this.load.image('ladder', 'assets/images/ladders.png');
        this.load.image('enemy', 'assets/images/Lvl2boi2.png');
        // this.load.image('enemy2', 'assets/images/boi4.png');
        this.load.image('enemy3', 'assets/images/Lvl2boi1.png');
        // this.load.image('enemy4', 'assets/images/boi2.png');


    },
    create: function() {
        // game.physics.p2.updateBoundsCollisionGroup();

        game.stage.backgroundColor = "#45A7A7";
        field = game.add.tileSprite(-240, 0, 800, 600, "ladder");
        field.scale.x = (1.6);

        this.girl2 = this.game.add.sprite(350, 450, 'girl2');
        this.girl2.anchor.setTo(0.5, 0.5);
        this.girl2.scale.setTo(0.3);
        // this.girl1.body.collides(enemyCollisionGroup)


        var listEnemy = ["enemy"]
        var listEnemy2 = ["enemy3"]


        var generate = 300;
        var baseTimer1 = 0;
        var baseTimer2 = 0;

        for (i = 0; i < generate; i++) {
            var randomEnemy = listEnemy[Math.round(Math.random() * (listEnemy.length - 1))]

            //Adjust timing
            game.time.events.add(baseTimer1 += Math.min(Math.random() * 1 * Phaser.Timer.SECOND, Phaser.Timer.SECOND * 0.7), function(j) {
                console.log(listEnemy, j)



                //Don't appear on the inside of the ladder.
                var rand = 300;
                while ((rand < 800 && rand > 220) || (rand < 130 && rand > 0))

                    rand = Math.random() * 800;



                var spr = game.add.sprite(rand, -100, j);
                var size = Math.max(Math.random() * 0.45, 0.44)
                spr.anchor.setTo(0.5, 0.5);
                spr.scale.setTo(size);

                globalList.push(spr);
            }, this, randomEnemy);
        }

        for (i = 0; i < generate; i++) {
            var randomEnemy = listEnemy2[Math.round(Math.random() * (listEnemy2.length - 1))]

            //Adjust timing of list 2
            game.time.events.add(baseTimer2 += Math.min(Math.random() * 1 * Phaser.Timer.SECOND, Phaser.Timer.SECOND * 0.7), function(j) {
                console.log(listEnemy2, j)



                //Don't appear on the inside of the ladder.
                var rand = 300;
                while ((rand < 500 && rand > 0) || (rand < 800 && rand > 700))
                    rand = Math.random() * 800;



                var spr = game.add.sprite(rand, -100, j);

                var size = Math.max(Math.random() * 0.45, 0.44)

                spr.anchor.setTo(0.5, 0.5);
                spr.scale.setTo(size);

                globalList.push(spr);
            }, this, randomEnemy);
        }


        var me = this;
        // me.game.stage.backgroundColor = '#16a085';
        //Keep track of the users score
        me.score = 0;
        me.scoreBuffer = 0;
        // globallives= 5;
        me.livesBuffer = 0;
        //Create the score label
        me.createScore();

    },
    createScore: function() {

        var me = this;
        var scoreFont = "80px Arial";
        var livesFont = "40px Arial";

        //Create the score label
        me.scoreLabel = me.game.add.text(me.game.world.centerX, 480, "0", {
            font: scoreFont,
            fill: "#ffffff",
            stroke: "#535353",
            strokeThickness: 15
        });
        me.scoreLabel.anchor.setTo(0.5, 0);
        me.scoreLabel.align = 'center';

        //Create a tween to grow / shrink the score label
        me.scoreLabelTween = me.add.tween(me.scoreLabel.scale).to({
            x: 1.5,
            y: 1.5
        }, 200, Phaser.Easing.Linear.In).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Linear.In);

        me.livesLabel = me.game.add.text(me.game.world.centerX, 40, "Lives: " + globallives, {
            font: livesFont,
            fill: "#ffffff",
            stroke: "#535353",
            strokeThickness: 5

        });
        me.livesLabel.anchor.setTo(0.5, 0);
        me.livesLabel.align = "center";

        me.livesLabelTween = me.add.tween(me.livesLabel.scale).to({
            x: 1.5,
            y: 1.5
        }, 200, Phaser.Easing.Linear.In).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Linear.In);


    },


    update: function() {


        for (i = 0; i < globalList.length; i++) {
            var entry = globalList[i];
            //Change speed
            entry.y += 10;
            if (this.girl2.overlap(entry)) {
                if (!timeout) {
                    timeout = true;
                    setTimeout(function() {
                        timeout = false;

                    }, 1000)
                    this.decrementLives();
                    this.createScoreAnimationNegative(this.girl2.x, this.girl2.y, -1, 0);
                }

            }
        }


        if (!positiveScoreTimeout) {
            positiveScoreTimeout = true;
            setTimeout(function() {
                positiveScoreTimeout = false;
            }, 1500)
            this.scoreBuffer += 1
            this.livesBuffer -= 1
                // this.createScoreAnimation(this.girl1.x, this.girl1.y, '+' + 2, 2);
        }


        field.tilePosition.y += 2;
        var cursors = cursors = game.input.keyboard.createCursorKeys();

        if (cursors.left.isDown && this.girl2.x > 290) {
            this.girl2.x -= 4;
            // this.girl1.body.moveLeft(200);
            this.girl2.scale.x = -(0.3);
        } else if (cursors.right.isDown && this.girl2.x < 530) {
            this.girl2.x += 4;
            // this.girl1.body.moveRight(200);
            this.girl2.scale.x = (0.3);
        }


        console.log(this.score, this.scoreBuffer)

        var me = this;
        if (me.scoreBuffer > 0) {
            me.incrementScore();
            me.scoreBuffer--;
        }
        // if (me.scoreBuffer < 0) {
        //     me.decrementScore();
        //     me.scoreBuffer++;
        // }
        if (me.score == 20) {
            // game.state.end('Level1')
            game.state.start('Level2to3Screen');
        }
        if (globallives== 0) {
            game.state.start('EndGame');

        }
    },

    incrementScore: function() {

        var me = this;
        //Increase the score by one and update the total score label text
        me.score += 1;
        me.scoreLabel.text = me.score;
    },
    decrementLives: function() {

        var me = this;
        //Increase the score by one and update the total score label text
        globallives-= 1;
        me.livesLabel.text = "Lives: " + globallives;
    },

    createScoreAnimationNegative: function(x, y, message, score) {

        var me = this;

        var livesFont = "35px Arial";

        //Create a new label for the score
        var livesAnimation = me.game.add.text(x, y, message, {
            font: livesFont,
            fill: "#39d179",
            stroke: "#ffffff",
            strokeThickness: 5
        });
        livesAnimation.anchor.setTo(0.5, 0);
        livesAnimation.align = 'center';

        //Tween this score label to the total score label
        var livesTween = me.game.add.tween(livesAnimation).to({
            x: me.game.world.centerX,
            y: 90
        }, 800, Phaser.Easing.Exponential.In, true);

        //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
        livesTween.onComplete.add(function() {
            livesAnimation.destroy();
            me.livesLabelTween.start();
            me.livesBuffer -= globallives;
        }, me);
    },
};


//////////////////////// LEVEL / 3 /////////////////////////
game.Level3 = function() {};

game.Level3 = {
    preload: function() {
        this.load.image('girl1', 'assets/images/heroSpriteLvl3.png');
        this.load.image('ladder', 'assets/images/ladders.png');
        this.load.image('enemy', 'assets/images/Lvl3boi3.png');
        this.load.image('enemy2', 'assets/images/Lvl3boi4.png');
        this.load.image('enemy3', 'assets/images/Lvl3boi1.png');
        this.load.image('enemy4', 'assets/images/Lvl3boi2.png');


    },
    create: function() {
        // game.physics.p2.updateBoundsCollisionGroup();

        game.stage.backgroundColor = "#8BCBCB";
        field = game.add.tileSprite(-240, 0, 800, 600, "ladder");
        field.scale.x = (1.6);

        this.girl1 = this.game.add.sprite(350, 450, 'girl1');
        this.girl1.anchor.setTo(0.5, 0.5);
        this.girl1.scale.setTo(0.3);
        // this.girl1.body.collides(enemyCollisionGroup)


        var listEnemy = ["enemy", "enemy2"]
        var listEnemy2 = ["enemy3", "enemy4"]


        var generate = 300;
        var baseTimer1 = 0;
        var baseTimer2 = 0;

        for (i = 0; i < generate; i++) {
            var randomEnemy = listEnemy[Math.round(Math.random() * (listEnemy.length - 1))]

            //Adjust timing
            game.time.events.add(baseTimer1 += Math.min(Math.random() * 1 * Phaser.Timer.SECOND, Phaser.Timer.SECOND * 0.6), function(j) {
                console.log(listEnemy, j)



                //Don't appear on the inside of the ladder.
                var rand = 300;
                while ((rand < 800 && rand > 218) || (rand < 145 && rand > 0))
                    rand = Math.random() * 800;



                var spr = game.add.sprite(rand, -100, j);
                var size = Math.max(Math.random() * 0.45, 0.44)
                spr.anchor.setTo(0.5, 0.5);
                spr.scale.setTo(size);

                globalList.push(spr);
            }, this, randomEnemy);
        }

        for (i = 0; i < generate; i++) {
            var randomEnemy = listEnemy2[Math.round(Math.random() * (listEnemy2.length - 1))]

            //Adjust timing of list 2
            game.time.events.add(baseTimer2 += Math.min(Math.random() * 1 * Phaser.Timer.SECOND, Phaser.Timer.SECOND * 0.5), function(j) {
                console.log(listEnemy2, j)



                //Don't appear on the inside of the ladder.
                var rand = 300;
                while ((rand < 500 && rand > 0) || (rand < 800 && rand > 700))
                    rand = Math.random() * 800;



                var spr = game.add.sprite(rand, -100, j);

                var size = Math.max(Math.random() * 0.45, 0.44)

                spr.anchor.setTo(0.5, 0.5);
                spr.scale.setTo(size);

                globalList.push(spr);
            }, this, randomEnemy);
        }


        var me = this;
        // me.game.stage.backgroundColor = '#16a085';
        //Keep track of the users score
        me.score = 0;
        me.scoreBuffer = 0;
        // globallives= 5;
        me.livesBuffer = 0;
        //Create the score label
        me.createScore();

    },
    createScore: function() {

        var me = this;
        var scoreFont = "80px Arial";
        var livesFont = "40px Arial";

        //Create the score label
        me.scoreLabel = me.game.add.text(me.game.world.centerX, 480, "0", {
            font: scoreFont,
            fill: "#ffffff",
            stroke: "#535353",
            strokeThickness: 15
        });
        me.scoreLabel.anchor.setTo(0.5, 0);
        me.scoreLabel.align = 'center';

        //Create a tween to grow / shrink the score label
        me.scoreLabelTween = me.add.tween(me.scoreLabel.scale).to({
            x: 1.5,
            y: 1.5
        }, 200, Phaser.Easing.Linear.In).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Linear.In);

        me.livesLabel = me.game.add.text(me.game.world.centerX, 40, "Lives: " + globallives, {
            font: livesFont,
            fill: "#ffffff",
            stroke: "#535353",
            strokeThickness: 5

        });
        me.livesLabel.anchor.setTo(0.5, 0);
        me.livesLabel.align = "center";

        me.livesLabelTween = me.add.tween(me.livesLabel.scale).to({
            x: 1.5,
            y: 1.5
        }, 200, Phaser.Easing.Linear.In).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Linear.In);


    },


    update: function() {


        for (i = 0; i < globalList.length; i++) {
            var entry = globalList[i];
            //Change speed
            entry.y += 14;
            if (this.girl1.overlap(entry)) {
                if (!timeout) {
                    timeout = true;
                    setTimeout(function() {
                        timeout = false;

                    }, 1000)
                    this.decrementLives();
                    this.createScoreAnimationNegative(this.girl1.x, this.girl1.y, -1, 0);
                }

            }
        }


        if (!positiveScoreTimeout) {
            positiveScoreTimeout = true;
            setTimeout(function() {
                positiveScoreTimeout = false;
            }, 1500)
            this.scoreBuffer += 1
            this.livesBuffer -= 1
                // this.createScoreAnimation(this.girl1.x, this.girl1.y, '+' + 2, 2);
        }


        field.tilePosition.y += 2;
        var cursors = cursors = game.input.keyboard.createCursorKeys();

        if (cursors.left.isDown && this.girl1.x > 290) {
            this.girl1.x -= 4;
            // this.girl1.body.moveLeft(200);
            this.girl1.scale.x = -(0.3);
        } else if (cursors.right.isDown && this.girl1.x < 530) {
            this.girl1.x += 4;
            // this.girl1.body.moveRight(200);
            this.girl1.scale.x = (0.3);
        }


        console.log(this.score, this.scoreBuffer)

        var me = this;
        if (me.scoreBuffer > 0) {
            me.incrementScore();
            me.scoreBuffer--;
        }
        // if (me.scoreBuffer < 0) {
        //     me.decrementScore();
        //     me.scoreBuffer++;
        // }
        if (me.score == 25) {
            // game.state.end('Level1')
            globalList = [];
            console.log(globalList);
            game.state.start('Level3to4Screen');
        }
        if (globallives== 0) {
            globalList = [];
            game.state.start('EndGame');

        }
    },

    incrementScore: function() {

        var me = this;
        //Increase the score by one and update the total score label text
        me.score += 1;
        me.scoreLabel.text = me.score;
    },
    decrementLives: function() {

        var me = this;
        //Increase the score by one and update the total score label text
        globallives-= 1;
        me.livesLabel.text = "Lives: " + globallives;
    },

    createScoreAnimationNegative: function(x, y, message, score) {

        var me = this;

        var livesFont = "35px Arial";

        //Create a new label for the score
        var livesAnimation = me.game.add.text(x, y, message, {
            font: livesFont,
            fill: "#39d179",  
            stroke: "#ffffff",
            strokeThickness: 5
        });
        livesAnimation.anchor.setTo(0.5, 0);
        livesAnimation.align = 'center';

        //Tween this score label to the total score label
        var livesTween = me.game.add.tween(livesAnimation).to({
            x: me.game.world.centerX,
            y: 90
        }, 800, Phaser.Easing.Exponential.In, true);

        //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
        livesTween.onComplete.add(function() {
            livesAnimation.destroy();
            me.livesLabelTween.start();
            me.livesBuffer -= globallives;
        }, me);
    },
};


/////////////////////// LEVEL / 4 ////////////////////////////
game.Level4 = function() {};

game.Level4 = {
    preload: function() {
        this.load.image('girl1', 'assets/images/heroSpriteLvl4.png');
        this.load.image('ladder', 'assets/images/ladders.png');
        this.load.image('enemy', 'assets/images/Lvl4boi1.png');
        this.load.image('enemy2', 'assets/images/Lvl4boi2.png');
        this.load.image('enemy3', 'assets/images/Lvl4boi3.png');
        this.load.image('enemy4', 'assets/images/Lvl4boi4.png');


    },
    create: function() {
        // game.physics.p2.updateBoundsCollisionGroup();

        game.stage.backgroundColor = "#DDF4F4";
        field = game.add.tileSprite(-240, 0, 800, 600, "ladder");
        field.scale.x = (1.6);

        this.girl1 = this.game.add.sprite(350, 450, 'girl1');
        this.girl1.anchor.setTo(0.5, 0.5);
        this.girl1.scale.setTo(0.3);
        // this.girl1.body.collides(enemyCollisionGroup)


        var listEnemy = ["enemy", "enemy2"]
        var listEnemy2 = ["enemy3", "enemy4"]


        var generate = 300;
        var baseTimer1 = 0;
        var baseTimer2 = 0;

        for (i = 0; i < generate; i++) {
            var randomEnemy = listEnemy[Math.round(Math.random() * (listEnemy.length - 1))]

            //Adjust timing
            game.time.events.add(baseTimer1 += Math.min(Math.random() * 1 * Phaser.Timer.SECOND, Phaser.Timer.SECOND * 0.5), function(j) {
                console.log(listEnemy, j)



                //Don't appear on the inside of the ladder.
                var rand = 300;
                while ((rand < 800 && rand > 218) || (rand < 130 && rand > 0))
                    rand = Math.random() * 800;



                var spr = game.add.sprite(rand, -100, j);
                var size = Math.max(Math.random() * 0.45, 0.44)
                spr.anchor.setTo(0.5, 0.5);
                spr.scale.setTo(size);

                globalList.push(spr);
            }, this, randomEnemy);
        }

        for (i = 0; i < generate; i++) {
            var randomEnemy = listEnemy2[Math.round(Math.random() * (listEnemy2.length - 1))]

            //Adjust timing of list 2
            game.time.events.add(baseTimer2 += Math.min(Math.random() * 1 * Phaser.Timer.SECOND, Phaser.Timer.SECOND * 0.3), function(j) {
                console.log(listEnemy2, j)



                //Don't appear on the inside of the ladder.
                var rand = 300;
                while ((rand < 500 && rand > 0) || (rand < 800 && rand > 700))
                    rand = Math.random() * 800;



                var spr = game.add.sprite(rand, -100, j);

                var size = Math.max(Math.random() * 0.45, 0.44)

                spr.anchor.setTo(0.5, 0.5);
                spr.scale.setTo(size);

                globalList.push(spr);
            }, this, randomEnemy);
        }


        var me = this;
        // me.game.stage.backgroundColor = '#16a085';
        //Keep track of the users score
        me.score = 0;
        me.scoreBuffer = 0;
        // globallives= 5;
        me.livesBuffer = 0;
        //Create the score label
        me.createScore();

    },
    createScore: function() {

        var me = this;
        var scoreFont = "80px Arial";
        var livesFont = "40px Arial";

        //Create the score label
        me.scoreLabel = me.game.add.text(me.game.world.centerX, 480, "0", {
            font: scoreFont,
            fill: "#ffffff",
            stroke: "#535353",
            strokeThickness: 15
        });
        me.scoreLabel.anchor.setTo(0.5, 0);
        me.scoreLabel.align = 'center';

        //Create a tween to grow / shrink the score label
        me.scoreLabelTween = me.add.tween(me.scoreLabel.scale).to({
            x: 1.5,
            y: 1.5
        }, 200, Phaser.Easing.Linear.In).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Linear.In);

        me.livesLabel = me.game.add.text(me.game.world.centerX, 40, "Lives: " + globallives, {
            font: livesFont,
            fill: "#ffffff",
            stroke: "#535353",
            strokeThickness: 5

        });
        me.livesLabel.anchor.setTo(0.5, 0);
        me.livesLabel.align = "center";

        me.livesLabelTween = me.add.tween(me.livesLabel.scale).to({
            x: 1.5,
            y: 1.5
        }, 200, Phaser.Easing.Linear.In).to({
            x: 1,
            y: 1
        }, 200, Phaser.Easing.Linear.In);


    },


    update: function() {


        for (i = 0; i < globalList.length; i++) {
            var entry = globalList[i];
            //Change speed
            entry.y += 18;
            if (this.girl1.overlap(entry)) {
                if (!timeout) {
                    timeout = true;
                    setTimeout(function() {
                        timeout = false;

                    }, 1000)
                    this.decrementLives();
                    this.createScoreAnimationNegative(this.girl1.x, this.girl1.y, -1, 0);
                }

            }
        }


        if (!positiveScoreTimeout) {
            positiveScoreTimeout = true;
            setTimeout(function() {
                positiveScoreTimeout = false;
            }, 1500)
            this.scoreBuffer += 1
            this.livesBuffer -= 1
                // this.createScoreAnimation(this.girl1.x, this.girl1.y, '+' + 2, 2);
        }


        field.tilePosition.y += 2;
        var cursors = cursors = game.input.keyboard.createCursorKeys();

        if (cursors.left.isDown && this.girl1.x > 290) {
            this.girl1.x -= 4;
            // this.girl1.body.moveLeft(200);
            this.girl1.scale.x = -(0.3);
        } else if (cursors.right.isDown && this.girl1.x < 530) {
            this.girl1.x += 4;
            // this.girl1.body.moveRight(200);
            this.girl1.scale.x = (0.3);
        }


        console.log(this.score, this.scoreBuffer)

        var me = this;
        if (me.scoreBuffer > 0) {
            me.incrementScore();
            me.scoreBuffer--;
        }
        // if (me.scoreBuffer < 0) {
        //     me.decrementScore();
        //     me.scoreBuffer++;
        // }
        if (me.score == 30) {
            // game.state.end('Level1')
            globalList = [];
            console.log(globalList);
            game.state.start('YouWin');
        }
        if (globallives== 0) {
            globalList = [];
            game.state.start('EndGame');

        }
    },

    incrementScore: function() {

        var me = this;
        //Increase the score by one and update the total score label text
        me.score += 1;
        me.scoreLabel.text = me.score;
    },
    decrementLives: function() {

        var me = this;
        //Increase the score by one and update the total score label text
        globallives-= 1;
        me.livesLabel.text = "Lives: " + globallives;
    },

    createScoreAnimationNegative: function(x, y, message, score) {

        var me = this;

        var livesFont = "35px Arial";

        //Create a new label for the score
        var livesAnimation = me.game.add.text(x, y, message, {
            font: livesFont,
            fill: "#39d179",  
            stroke: "#ffffff",
            strokeThickness: 5
        });
        livesAnimation.anchor.setTo(0.5, 0);
        livesAnimation.align = 'center';

        //Tween this score label to the total score label
        var livesTween = me.game.add.tween(livesAnimation).to({
            x: me.game.world.centerX,
            y: 90
        }, 800, Phaser.Easing.Exponential.In, true);

        //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
        livesTween.onComplete.add(function() {
            livesAnimation.destroy();
            me.livesLabelTween.start();
            me.livesBuffer -= globallives;
        }, me);
    },
};


/////////////////// MIDSCREENS //////////////////////////////////

game.Level1to2Screen = function() {};

game.Level1to2Screen = {
    preload: function() {
        this.load.image('menu', 'assets/images/menu.png');
        this.load.image('girl2', 'assets/images/HeroSpriteLvl2.png');
        this.load.image('enemy', 'assets/images/Lvl2boi1.png');
        this.load.image('enemy2', 'assets/images/Lvl2boi2.png');
    },
    create: function() {
        game.stage.backgroundColor = "#9600ff"; 
        var levelstyle = { font: "bold 100px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle"};
        var levelstyle2 = { font: "bold 70px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle"};
        levelup = game.add.text(400, 0, "Level Up to", levelstyle);
        adol = game.add. text(400, 10, "Adolescence", levelstyle);
        levelup.anchor.setTo(0.5,0.5);
        levelup.setTextBounds(0, 100, 800, 100);
        adol.anchor.setTo(0.5,0.5);
        adol.setTextBounds(0, 200, 800, 100);


        // this.girl2 = this.game.add.sprite(400, 430, 'girl2');
        // this.girl2.anchor.setTo(0.5, 0.5);
        // this.girl2.scale.setTo(0.6);


        this.enemy = this.game.add.sprite(600, 430, 'enemy');
        this.enemy.anchor.setTo(0.5, 0.5);
        this.enemy.scale.setTo(0.55);


        this.enemy2 = this.game.add.sprite(200, 430, 'enemy2');
        this.enemy2.anchor.setTo(0.5, 0.5);
        this.enemy2.scale.setTo(0.55);
 
        // this.menu.inputEnabled = true; 
        //this.menu.events.onInputOver.add(listener, this);

        var style = {
            font: "bold 20px Courier New",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        keytostart = game.add.text(0, 0, "Press Up Arrow Key to Continue!", style);
        keytostart.setTextBounds(150, 530, 800, 100);
        keytostart.anchor.setTo(0.5, 0.5);
    },
    update: function() {
        globalList = [];
        var cursors = cursors = game.input.keyboard.createCursorKeys();

        if (cursors.up.isDown) {
            game.state.start('Level2');
        }
    },
};


game.Level2to3Screen = function() {};

game.Level2to3Screen = {
    preload: function() {
        this.load.image('menu', 'assets/images/menu.png');
        this.load.image('girl2', 'assets/images/HeroSpriteLvl3.png');
        this.load.image('enemy', 'assets/images/Lvl3boi1.png');
        this.load.image('enemy2', 'assets/images/Lvl3boi2.png');
        this.load.image('enemy3', 'assets/images/Lvl3boi3.png');
        this.load.image('enemy4', 'assets/images/Lvl3boi4.png'); 
    },
    create: function() {
       game.stage.backgroundColor = "#9600ff"; 
        var levelstyle = { font: "bold 100px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle"};
        var levelstyle2 = { font: "bold 70px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle"};
        levelup = game.add.text(400, 0, "Level Up to", levelstyle);
        adol = game.add. text(400, 10, "Adulthood", levelstyle);
        levelup.anchor.setTo(0.5,0.5);
        levelup.setTextBounds(0, 100, 800, 100);
        adol.anchor.setTo(0.5,0.5);
        adol.setTextBounds(0, 200, 800, 100);


        // this.girl2 = this.game.add.sprite(400, 430, 'girl2');
        // this.girl2.anchor.setTo(0.5, 0.5);
        // this.girl2.scale.setTo(0.5);


        this.enemy = this.game.add.sprite(500, 430, 'enemy');
        this.enemy.anchor.setTo(0.5, 0.5);
        this.enemy.scale.setTo(0.32);


        this.enemy2 = this.game.add.sprite(700, 430, 'enemy2');
        this.enemy2.anchor.setTo(0.5, 0.5);
        this.enemy2.scale.setTo(0.32);

        this.enemy3 = this.game.add.sprite(300, 430, 'enemy3');
        this.enemy3.anchor.setTo(0.5, 0.5);
        this.enemy3.scale.setTo(0.32);

        this.enemy4 = this.game.add.sprite(100, 430, 'enemy4');
        this.enemy4.anchor.setTo(0.5, 0.5);
        this.enemy4.scale.setTo(0.32);
 
        // this.menu.inputEnabled = true; 
        //this.menu.events.onInputOver.add(listener, this);

        var style = {
            font: "bold 20px Courier New",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        keytostart = game.add.text(0, 0, "Press Up Arrow Key to Continue!", style);
        keytostart.setTextBounds(150, 530, 800, 100);
        keytostart.anchor.setTo(0.5, 0.5);

    },
    update: function() {
        globalList = [];
        var cursors = cursors = game.input.keyboard.createCursorKeys();

        if (cursors.up.isDown) {
            game.state.start('Level3');
        }
    },
};


game.Level3to4Screen = function() {};

game.Level3to4Screen = {
    preload: function() {
         this.load.image('menu', 'assets/images/menu.png');
        this.load.image('girl4', 'assets/images/HeroSpriteLvl4.png');
        this.load.image('enemy', 'assets/images/Lvl4boi1.png');
        this.load.image('enemy2', 'assets/images/Lvl4boi2.png');
        this.load.image('enemy3', 'assets/images/Lvl4boi3.png');
        this.load.image('enemy4', 'assets/images/Lvl4boi4.png');
    },
    create: function() {
         game.stage.backgroundColor = "#9600ff"; 
        var levelstyle = { font: "bold 100px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle"};
        var levelstyle2 = { font: "bold 70px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle"};
        levelup = game.add.text(400, 0, "Level Up to", levelstyle);
        adol = game.add. text(400, 10, "Career", levelstyle);
        levelup.anchor.setTo(0.5,0.5);
        levelup.setTextBounds(0, 100, 800, 100);
        adol.anchor.setTo(0.5,0.5);
        adol.setTextBounds(0, 200, 800, 100);


        // this.girl4 = this.game.add.sprite(400, 430, 'girl4');
        // this.girl4.anchor.setTo(0.5, 0.5);
        // this.girl4.scale.setTo(0.5);


        this.enemy = this.game.add.sprite(100, 430, 'enemy');
        this.enemy.anchor.setTo(0.5, 0.5);
        this.enemy.scale.setTo(0.3);


        this.enemy2 = this.game.add.sprite(300, 430, 'enemy2');
        this.enemy2.anchor.setTo(0.5, 0.5);
        this.enemy2.scale.setTo(0.3);


        this.enemy3 = this.game.add.sprite(500, 430, 'enemy3');
        this.enemy3.anchor.setTo(0.5, 0.5);
        this.enemy3.scale.setTo(0.3);


        this.enemy4 = this.game.add.sprite(700, 430, 'enemy4');
        this.enemy4.anchor.setTo(0.5, 0.5);
        this.enemy4.scale.setTo(0.3);
 
        // this.menu.inputEnabled = true; 
        //this.menu.events.onInputOver.add(listener, this);

        var style = {
            font: "bold 20px Courier New",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        keytostart = game.add.text(0, 0, "Press Up Arrow Key to Continue!", style);
        keytostart.setTextBounds(150, 530, 800, 100);
        keytostart.anchor.setTo(0.5, 0.5);
    },
    update: function() {
        globalList = [];
        var cursors = cursors = game.input.keyboard.createCursorKeys();

        if (cursors.up.isDown) {
            game.state.start('Level4');
        }
    },
};

game.EndGame = function() {};

game.EndGame = {
    preload: function() {
        this.load.image('endgame', 'assets/images/gameOver.png');
    },
    create: function() {
        this.endgame = this.game.add.sprite(400, 300, 'endgame');
        this.endgame.anchor.setTo(0.5, 0.5);
        this.endgame.scale.setTo(0.5);
        this.endgame.inputEnabled = true;
        //this.menu.events.onInputOver.add(listener, this);

          var style = {
            font: "bold 20px Courier New",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        keytostart = game.add.text(0, 0, "Press Up Arrow Key to Retry!", style);
        keytostart.setTextBounds(150, 530, 800, 100);
        keytostart.anchor.setTo(0.5, 0.5);

    },
    update: function() {
        globalList = [];
        var cursors = cursors = game.input.keyboard.createCursorKeys();

        if (cursors.up.isDown) {
            globallives = 7;
            game.state.start('Level1');
            
        }

    },
};

game.YouWin = function() {};

game.YouWin = {
    preload: function() {
        this.load.image('win','assets/images/win3.png');
    },
    create: function() {
        this.win = this.game.add.sprite(400, 300, 'win');
        this.win.anchor.setTo(0.5, 0.5);
        this.win.scale.setTo(0.3);
        this.win.inputEnabled = true;
    },
    update: function() {

    }
};

function createEnemies() {
    for (var y = 0; y < 2; y++) { //"create boy everytime until y=4") { //"create boy everytime until y=4"
        for (var x = 0; x < 2; x++) { //to make a square
            var enemy = enemies.create(Math.random() * 800, 30 - Math.random() * 1000, 'enemy');
            enemy.anchor.setTo(0.5, 0.5);
        }
    }

    enemies.x = 100;
    enemies.y = 50;


    var tween = game.add.tween(enemies).to({
        x: 200
    }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    // 2000 is speed

    tween.onLoop.add(descend, this);
}

function descend() {
    enemies.y += 2;
}

game.state.add('prequote', game.prequote);
game.state.add('quote', game.quote);
game.state.add('MenuScreen', game.MenuScreen);
game.state.add('Level1', game.Level1);
game.state.add('Level1to2Screen', game.Level1to2Screen);
game.state.add('Level2', game.Level2);
game.state.add('Level2to3Screen', game.Level2to3Screen);
game.state.add('Level3', game.Level3);
game.state.add('Level3to4Screen', game.Level3to4Screen);
game.state.add('Level4', game.Level4);
game.state.add('YouWin', game.YouWin);
game.state.add('EndGame', game.EndGame);
game.state.start('MenuScreen');
