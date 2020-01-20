// $(function () {
//     imagesProgress();
//     function imagesProgress() {
//         var   $container    = $('#progress'),
//               $progressBar  = $container.find('.progress-bar'),
//               $progressText = $container.find('.progress-text'),
//               imgLoad       = imagesLoaded('body'),
//               imgTotal      = imgLoad.images.length,
//               imgLoaded     = 0,
//               current       = 0,
//               progressTimer = setInterval(updateProgress, 1000 / 60);
//               imgLoad.on('progress', function () {
//                   imgLoaded++;
//               });
//               function updateProgress () {
//                   var target = (imgLoaded / imgTotal) * 100;
//                   current += (target - current) * 0.1;

//                   $progressBar.css({ width: current + '%' });
//                   $progressText.text(Math.floor(current) + '%');
//                   if (current >= 100){
//                       clearInterval(progressTimer)
//                       $container.addClass('progress-complete');
//                       $progressBar.add($progressText)
//                       .delay(500)
//                       .animate({ opacity: 0 }, 250, function () {
//                           $container.animate({
//                               top: '-100%'
//                           }, 1000, 'easeInOutQuint');
//                       });
//                   }
//                   if (current > 99.9) {
//                       current = 100;
//                   }
//               }
//          }
// });

$(function () {
    initScene3();
    // scene mask animation
    function initScene3 () {
        var $container = $('#scene-3'),
            $masks     = $container.find('.mask'),
            $lines     = $masks.find('.line'),
            maskLength = $masks.length,
            // Array for saving each clip mask range
            maskData = [];

            // save each left mask coordinate clip
            $masks.each(function (i) {
                maskData[i] = { left: 0 };
            });
            // executes either when mask on or off
            $container.on({
                mouseenter: function() {
                    resizeMask($(this).index());
                },
                mouseleave: function () {
                    resizeMask(-1);
                }
            }, '.mask');

            // set clip position and border line for each first mask
           resizeMask(-1);
        //    function for each of those animation
        function resizeMask (active) {
            // get containers width and height
            // clip based on coordinates right and bottom
            var w = $container.width(),
                h = $container.height();

                // execute every mask
                $masks.each(function (i){
                  var $this = $(this),
                  l;
                //   active = mouse index action when it on
                // if it -1 = being off 
                // i = this mouse index

                // expell clipped mouse range left coordinate by mouse event
                if (active === -1) {
                    // when mouse is off divide into even
                    l = w / maskLength * i;
                } else if (active < i) {
                    // except the parts where mouse is on that
                    // modify left toward right range
                    l = w * (1 - 0.1 * (maskLength - i));
                } else {
                    //  otherwise left side toward left
                    l = w * 0.05 * i;
                }

                // make animation maskData[i] savedleft cordinate until l.amouts
                $(maskData[i]).stop(true).animate({ left: l }, {
                    duration: 1000,
                    easing: 'easeOutQuart',
                    // replace mast to css border line
                    progress: function () {
                        var now = this.left;
                        $this.css({
                            // each value reconstruct into rect
                            clip: 'rect(0px ' + w + 'px ' +
                                   h + 'px ' + now + 'px)'
                        });
                        $this.find($lines).css({
                            left: now
                        });
                    }
                });
                });
        }
    }
});

                  // btn animation // 
$(function(){
    var duration = 300;
    $('#buttons01').on('mouseover',function(){
        $(this).stop(true).animate({
            backgroundColor: '#ae5e9b',
            color: '#fff'
        },
        duration);
    })
    .on('mouseout', function(){
        $(this).stop(true).animate({
            backgroundColor: '#fff',
            color: 'ebc000'
        }, 
        duration);
    });
});