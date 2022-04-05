$(function () {

    //saving dom objects to variables
    var container = $("#container");
    var dog = $("#dog");
    var pole = $(".pole");
    var upPole = $("#upPole");
    var downPole = $("#downPole");
    var score = $("#score");
    var speed_span = $("#speed");
    var reStartBtn = $("#reStartBtn");

    //saving some initial setup
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css("right"));
    var pole_initial_height = parseInt(pole.css("height"));
    var dog_left = parseInt(dog.css("left"));
    var dog_height = parseInt(dog.height());
    var speed = 10;

    //some other declarations
    var go_up = false;
    var score_updated = false;
    var game_over = false;

    var the_game = setInterval(function () {

        if (collision(dog, upPole) || collision(dog, downPole)||parseInt(dog.css('top'))<=0||parseInt(dog.css('top'))>container_height-dog_height) {

            stop_the_game();

        } else {
            var pole_current_position = parseInt((pole.css("right")));

            //updated the score when poles have passed the dog successfully
            if (pole_current_position > container_width - dog_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 1);
                    score_updated = true;
                }
            }

            //check whether the poles went out of the container
            if (pole_current_position > container_width) {
                var new_height = parseInt(Math.random() * 100);

                // change the pole's height
                upPole.css("height", pole_initial_height + new_height);
                downPole.css("height", pole_initial_height - new_height);

                // increase speed
                speed = speed + 1;
                speed_span.text(speed);

                score_updated = false;

                pole_current_position = pole_initial_position;
            }

            //move the poles
            pole.css("right", pole_current_position + speed);

            if (go_up === false) {
                go_down();
            }
        }
    }, 40);

    $(document.on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over===false) {
            go_up = setInterval(up, 50);
        }
    }));

    $(document.on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    }));

    function go_down() {
        dog.css('top', parseInt(dog.css('top')) + 5);
    }

    function up() {
        dog.css('top', parseInt(dog.css('top')) - 10);
    }

    function stop_the_game() {
        clearInterval((the_game));
        game_over = true;
        reStartBtn.slideDown();
    }

    reStartBtn.click(function () {
        location.reload();
    })

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});