class Game {
    constructor() {

    }



    start() {
 
            background(startbg);
            form = new Form();
            form.display();

            player = new Player();
            player.getPlayers();

            intromusic.loop();

            bg = createSprite(100, 100, width, height);
            bg.addImage("BG1", bgIm);
            bg.addImage("BG2", bgIm2);
            bg.addImage("BG3", bgIm3);
            bg.addImage("BG4", bgIm4);
            bg.addImage("finish", startbg);
            bg.scale = 2.5;

            knight = createSprite(200, 100, 5, 5);
            knight.addAnimation("KnightIdle", knightIdle);
            knight.addAnimation("knightRun", knightRun);
            knight.scale = 0.2;


            fairy = createSprite(200, 50, 15, 15);
            fairy.visible = false


            dragon = createSprite(width, height / 2)
            dragon.addAnimation("flying", dragonIm)
            dragon.scale = 2
            dragon.visible = false

            floor = createSprite(750, height +420, width, height);
            floor.shapeColor = color(109, 217, 65);
            knight.collide(floor);


            mountain = createSprite(width / 2 + 600, height / 2 + 300, 400, 500)
            mountain.shapeColor = color(109, 217, 65);
            mountain.visible = false

            cage = createSprite(width / 2 + 600, height / 2 - 8, 20, 20)
            cage.addImage("cage", cageIm)
            cage.scale = 0.15
            cage.visible = false

            princess = createSprite(width / 2 + 600, height / 2 - 8, 20, 20)
            princess.scale = 0.8
            princess.visible = false
            princess.addAnimation("worried", princessIm)

            story = createSprite(width / 2 + 500, height / 2, 150, 150)
            story.addImage(storyIm)
            story.scale = 1.2

        

    }




    play() {
        background("white");

        gameState = 1;

        if (singleOrMulti === "multi") {

            knight.x = kpos.x;
            knight.y = kpos.y;

            fairy.visible = true

            fairy.collide(floor)

            if (keyDown(UP_ARROW)) {
                fairy.y = fairy.y - 5
            }
            if (keyDown(DOWN_ARROW)) {
                fairy.y = fairy.y + 5
            }

            if(fairy.isTouching(heartGroup))
                lives+=1;
        }

        knight.velocityY = knight.velocityY + 12
        knight.collide(floor)
        knight.bounceOff(edges);

        if (bg.x < 0) {
            bg.x = width / 2
        }

        if (keyDown("space")) {
            knight.velocityY = -70
        }

        Player.getPlrInfo();

        if (allPlayers != undefined) {
            var index = 0;

            var players = [knight, fairy];
           // console.log(players);

            // var x= players[index-1].x;
            // var y= players[index-1].y;

            for (var i in allPlayers) {
                if (index === player.index) {
                    stroke(10);
                    fill("red");
                    // ellipse(x,y,60,60);
                }
            }
        }

        princess.depth = cage.depth;
        cage.depth = cage.depth + 10;



        if ((keyWentDown("S") || plrCount === 2) && keyS === false) {
            intromusic.stop()
            bg.velocityX = -10
            knight.changeAnimation("knightRun", knightRun);

            form.hide()
            keyS = true

            playmusic.loop()
            story.destroy()
            voice.stop()



        }

        ThrowSwords()

        if (keyS === true) {

            Monster1()
            Monster2()
            hearts()


        }

        if (kills >= 1) {
            level = 2
            Monster3()
            //bg.changeImage("BG2", bgIm2);
            //bg.scale = 1.5
            //floor.shapeColor = color("#476321")

        }
        if (kills >= 2) {
            level = 3
            obstacles()
            // bg.changeImage("BG3", bgIm3);
            // bg.scale = 6.5
            //floor.shapeColor = color("#000000")

        }
        if (kills >= 3) {
            level = 4
            Monster5()
            // bg.changeImage("BG4", bgIm4);
            // bg.scale = 1
            //floor.shapeColor = color("#476321")
        }
        if (kills >= 4) {
            level = 5
            Monster4()


        }
        if (kills >= 5) {
            level = 6

            // on = true

        }

        if (level === 6) {


            //  if(on === true){
            //      translate(random(-5, 5), random(-5, 5));
            // }
            //  else if(on === false){
            //    translate(0,0)
            //}

            //console.log(on)


            var box1, box2, box3, box4

            box1 = createSprite(width / 2 - 100, height / 2, 20, 510)

            box2 = createSprite(width / 2 + 250, height / 2 + 150, 1130, 20)
            box3 = createSprite(width / 2 + 250, height / 2 - 270, 1130, 20)

            box4 = createSprite(width / 2 + 500, height / 2, 20, 510)

            box1.visible = false
            box2.visible = false
            box3.visible = false
            box4.visible = false

            playmusic.stop()


            fireballs()

            dragon.bounceOff(edges)

            dragon.bounceOff(box1)
            dragon.bounceOff(box2)
            dragon.bounceOff(box3)
            dragon.bounceOff(box4)

            monsters.destroyEach()


            if (played === false) {
                played = true;

                dragonRoar.play();



                BossMusic.loop();

                dragon.debug = true
                dragon.setCollider("rectangle", 0, 0, 100, 100);
                dragon.x = width / 2 + 350;
                dragon.y = height / 2 - 100;

                dragon.visible = true;
                dragon.velocityX = -5;
                dragon.velocityY = 2;

                mountain.depth = dragon.depth;
                princess.depth = dragon.depth;
                cage.depth = dragon.depth;
                dragon.depth = dragon.depth + 1;


                princess.visible = true;
                mountain.visible = true;
                cage.visible = true;



            }

            bg.velocityX = 0
            knight.changeAnimation("KnightIdle", knightIdle);


            if (swordGroup.isTouching(dragon)) {
                Dlives = Dlives - 1
                swordGroup.destroyEach()
                dragonHurt.play()
            }


            if (Dlives === 0) {

                BossMusic.stop()
                if (played2 === false) {
                    played2 = true
                    intromusic.loop()

                    // on = false

                }

                dragon.destroy();

                //whoosh.stop()
                fireGroup.destroyEach();
                swordGroup.destroyEach();
                heartGroup.destroyEach()



                princess.x = knight.x + 100;
                princess.y = knight.y;

                time = second()
               

               // console.log(time)
                if (time === second()-5 ) {
                    //console.log("h")

                    cage.destroy();

                    knight.destroy()
                    floor.destroy()
                    princess.destroy()
                    mountain.destroy()


                    bg.destroy()
                    background("black")


                    if (time >= 5) {
                        background(startbg)

                        finishStory = createSprite(width / 2 + 500, height / 2, 150, 150)
                        finishStory.addImage(fsImage)
                        finishStory.scale = 1
                    }








                }



            }


        }





        for (var i = 0; i < monsters.length; i++) {
            if (monsters.get(i).isTouching(knight)) {
                monsters.get(i).destroy()
                lives = lives - 1
                hurt.play();
                hit.play();
            }
        }

        for (var i = 0; i < fireGroup.length; i++) {
            if (fireGroup.get(i).isTouching(knight)) {
                fireGroup.get(i).destroy();
                lives = lives - 1;
                hurt.play();
                hit.play();
            }
        }


        for (var i = 0; i < monsters.length; i++) {
            if (monsters.get(i).isTouching(swordGroup)) {
                monsters.get(i).destroy();
                kills = kills + 1;
                //ghostHurt.play()
                hit.play();
                for (var i = 0; i < swordGroup.length; i++) {
                    swordGroup.get(i).destroy();;
                }
            }
        }

        for (var i = 0; i < heartGroup.length; i++) {
            if (heartGroup.get(i).isTouching(knight)) {
                heartGroup.get(i).destroy()
                lives = lives + 1
                collectSound.play()
            }
        }














        function Monster1() {
            if (frameCount % 100 === 0) {
                var hyena = createSprite(width, height - 78, 30, 30);
                hyena.velocityX = -23;
                hyena.addAnimation("HyenaRun", hyenaIm);
                hyena.scale = 1.5;
                hyena.lifetime = 150;
                hyena.setCollider("rectangle", 0, 0, 20, 20);
                monsters.add(hyena);
            }

        }



        function Monster2() {
            if (frameCount % Math.round(random(100, 200)) === 0) {
                var vulture = createSprite(width, Math.round(random(250, 600)), 30, 30);
                vulture.velocityX = -28;
                vulture.addAnimation("VultureRun", vultureIm);
                vulture.scale = 1.2;
                vulture.lifetime = 150;
                vulture.setCollider("rectangle", 0, 0, 20, 20);
                monsters.add(vulture);
            }

        }
        function Monster3() {
            if (frameCount % Math.round(random(100, 200)) === 0) {
                var deceased = createSprite(width, height - 78, 30, 30);
                deceased.velocityX = -18;
                deceased.addAnimation("DeceasedRun", deceasedIm);
                deceased.scale = 1.5;
                deceased.lifetime = 170;
                deceased.setCollider("rectangle", 0, 0, 20, 20);
                monsters.add(deceased);
            }

        }
        function Monster4() {
            if (frameCount % Math.round(random(100, 210)) === 0) {
                var scorpio = createSprite(width, height - 65, 30, 30);
                scorpio.velocityX = -18;
                scorpio.addAnimation("ScorpioRun", scorpioIm);
                scorpio.scale = 1.5;
                scorpio.lifetime = 170;
                monsters.add(scorpio);
            }

        }
        function Monster5() {
            if (frameCount % Math.round(random(110, 210)) === 0) {
                var mummy = createSprite(width, height - 78, 30, 30);
                mummy.velocityX = -16;
                mummy.addAnimation("MummyRun", mummyIm);
                mummy.scale = 1.5;
                mummy.lifetime = 170;
                mummy.setCollider("rectangle", 0, 0, 20, 20);
                monsters.add(mummy);
            }

        }


        function ThrowSwords() {
            if (keyWentDown("e")) {
                var throwSword = createSprite(knight.x + 100, knight.y, 10, 10);

                throwSword.addImage("sword", swordImage);
                throwSword.velocityX = 25;
                throwSword.scale = 0.035;
                swordswoosh.play();

                swordGroup.add(throwSword);
                throwSword.lifetime = 50;


            }

        }


        function fireballs() {
            if (frameCount % Math.round(random(50, 180)) === 0) {

                var fire = createSprite(dragon.x - 150, dragon.y + 20, 20, 20);

                fire.setSpeedAndDirection(-10, -18, fire.getDirection() + 1);

               // whoosh.play()

                fire.shapeColor = "red";
                fire.addImage("ball", fireballImage);
                fire.scale = 0.07;
                //fire.addImage("sword", swordImage)
                fire.velocityX = -15;
                fire.lifetime = 80;
                fire.angle = knight.angle;

                fireGroup.add(fire);


            }

        }

        function obstacles() {

            if (frameCount % 150 === 0) {
                var ob = createSprite(width, height - 43, 30, 30);

                var rand = Math.round(random(1, 3));
                switch (rand) {
                    case 1: ob.addImage(obs1);
                        ob.scale = 0.15
                        break;
                    case 2: ob.addImage(obs2);
                        ob.scale = 0.15
                        break;
                    case 3: ob.addImage(obs3);
                        ob.scale = 0.21
                        break;

                    default: break;
                }

                ob.velocityX = -16;
                // ob.addImage("spike", obsImage);
                //ob.scale = 0.3;
                ob.lifetime = 140;
                ob.setCollider("rectangle", 0, 0, 30, 30);
                // ob.debug = true
                monsters.add(ob);
            }

        }


        function hearts() {
            if (frameCount % 900 === 0) {
                var heart = createSprite(width, Math.round(random(350, 500)), 30, 30);
                heart.velocityX = -13;
                heart.addImage("Heart", heartImage);
                heart.scale = 0.1;
                heart.lifetime = 150;
                heart.setCollider("rectangle", 0, 0, 20, 20);
                heartGroup.add(heart);
            }

        }





        drawSprites();

        textSize(20);
        fill("white");
        if (lives >= 1 && Dlives != 0 && singleOrMulti === "single") {
            textAlign(CENTER);
           // text(form.name, knight.x - 10, knight.y - 80);

        }
        if (lives >= 1 && Dlives != 0 && singleOrMulti === "multi") {
            textAlign(CENTER);
            //   text(form.name, knight.x - 10, knight.y - 80);

        }

        if (level >= 1 && Dlives != 0) {
            //console.log(form.name);
            textSize(30);
            fill("red");
            stroke(25);
            text("Lives: " + lives, 100, 70);
            text("Kills: " + kills, 1200, 70);
            text("Level: " + level, 780, 120);
        }


        if (level === 6 && Dlives != 0) {
            fill("black");
            text("DRAGON LIVES: " + Dlives, dragon.x - 100, dragon.y - 150);


        }

        if (Dlives === 0) {
            fill("black");
            textSize(25)
            text("WELL DONE! YOU SLAYED THE DRAGON!!", 600, height / 2 - 200);
        }




        if (lives < 1) {
            //console.log("GAME OVER");
            game.end();


        }



    }
    end() {

        monsters.destroyEach();
        bg.velocityX = 0;
        bg.destroy();
        monsters.destroyEach();
        ///knight.destroy();

        keyS = false

        background(endbg);

        on = false


        fireGroup.destroyEach();
        heartGroup.destroyEach();
        swordGroup.destroyEach();

        fill("brown");
        stroke(100);
        textSize(30);
        text("Press 'R' to retry", 670, 600);
        text("Oh No.. ", 730, 120);
        textSize(130);
        text("GAME OVER!", 375, 350);

        if (keyDown("R")) {
            kills = 0;
            level = 1;
            lives = 5;
            background(startbg);
            monsters.destroyEach();

            gameState = 0
            game.start();
            playmusic.stop();
            BossMusic.stop();

        }

    }

    getState() {
        var gameref = database.ref('gameState')
        gameref.on("value", function (data) { gs = data.val() })
    }

    updateState(state) {
        database.ref('/').update({ gameState: state })
    }


}




//textAlign(CENTER);
//floor.shapeColor= color(0,0,0);