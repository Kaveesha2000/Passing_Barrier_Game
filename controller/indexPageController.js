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

    var the_game = setInterval(function () {

        var pole_current_position = parseInt((pole.css("right")));

        //check whether the poles went out of the container
        if (pole_current_position > container_width) {
            var new_height = parseInt(Math.random() + 100);

            // change the pole's height
            upPole.css("height",pole_initial_height+new_height);
            downPole.css("height",pole_initial_height-new_height);

            pole_current_position = pole_initial_position;
        }

        //move the poles
        pole.css("right", pole_current_position + speed);
    }, 40);

})