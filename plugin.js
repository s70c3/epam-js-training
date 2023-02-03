$(document).ready(function () {
    (function ($) {

        $.fn.cardPlugin = function (settings) {

            const default_settings = {
                direction: 'up',
                index: 0,
                debug: false
            }

            var settings = $.extend(default_settings, settings);

            // drag-and-drop enable
            const container = $(this).sortable().disableSelection();


            const startState = container.find('.card');

            $('.revertButton').click(function (event) {
                $('#cardContainer').empty().append(startState);
            });


            container.on('click', 'li', function (event) {
                const target = $(event.target);

                var {targetOffset, anchorCard, movingCards, movingOffset, realDirection} = calculateMovement(settings);


                function calculateMovement({direction, index}) {

                    const number = startState.length;
                    const cardSize = parseInt(target.css('marginTop')) + target.outerHeight();

                    let startIndex = target.index();

                    let realDirection = direction;

                    let movingCards = [];

                    if (direction === 'up') {
                        if (startIndex < index) {
                            realDirection = 'down';
                            movingCards = target.nextAll().slice(0, index - startIndex);
                        }
                        else {
                            movingCards = target.prevAll().slice(0, target.prevAll().length - index);
                        }
                    }
                    else {
                        if (startIndex > number - index - 1) {
                            realDirection = 'up';
                            movingCards = target.prevAll().slice(0, -(number - startIndex - 1 - index));
                        }
                        else {
                            movingCards = target.nextAll().slice(0, target.nextAll().length - index);
                        }
                    }

                    function calculateOffset(cards) {
                        let offset = 0;
                        cards.each(
                            function (index, card) {
                                offset += $(card).outerHeight() + parseInt($(card).css('marginTop'));
                            });
                        return realDirection === 'up' ? -offset : offset;
                    }

                    return {
                        targetOffset: calculateOffset(movingCards),
                        anchorCard: direction === 'up' ? index : number - 1 - index,
                        movingCards: movingCards,
                        movingOffset: realDirection === 'up' ? cardSize : -cardSize,
                        realDirection: realDirection
                    };

                }

                function setCard(anchorCard, direction) {
                    if (direction ===
                        'up') {
                        this.insertBefore(anchorCard)
                    }
                    else {
                        this.insertAfter(anchorCard);
                    }
                    return;
                }

                if (settings.debug) {
                    console.log('Click on card. Positions:')
                    $('.card').each(function (index) {
                        console.log(index + ": " + $(this).text());
                    });
                }

                if ($(':animated').length > 0) return;

                target.animate({left: 280}, 280)
                    .animate({top: targetOffset}, 300)
                    .animate({left: 0}, 280);
                movingCards.animate({top: movingOffset});

                $(':animated').promise().done(function () {
                    setCard.call(target, container.children() [anchorCard], realDirection);
                    $('.card').css({top: 0, left: 0});
                });

            })

        }

    })(jQuery);

    $('#cardContainer').cardPlugin({
        direction: 'down',
        index: 3,
        debug: true
    });
});



