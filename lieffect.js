(function ($) {

    $.fn.lieffect = function (options) {

        var settings = this.data('lieffect') || $.extend({}, {
            item: '.cell',
            container: $(this),
            speed: 200,
            easing: 'linear'
        }, options)
        if (!settings.initialized) {
            this.data('lieffect', settings)
            settings.items = settings.container.find(settings.item)
            settings.initialized = true
            settings.methods = {
                liHide: function (count, item) {
                    if (settings.hidden || (settings.animated === true && item === undefined)) return this
                    item = item === undefined ? settings.items.length - 1 : item
                    settings.animated = true
                    if (typeof count != 'undefined') item = count
                    settings.items.eq(item).animate({
                        opacity: 0
                    }, settings.speed, settings.easing, function () {
                        if (item > 0) {
                            item--;
                            settings.methods.liHide(undefined, item)
                        } else {
                            settings.hidden = true
                            settings.animated = false
                        }
                    })
                    return this;
                },

                liShow: function (count, item) {
                    if (!settings.hidden || (settings.animated === true && item === undefined)) return this
                    item = item === undefined ? 0 : item;
                    settings.animated = true;
                    if (typeof count != 'undefined') item = count;
                    settings.items.eq(item).animate({
                        opacity: 1
                    }, settings.speed, settings.easing, next);
                    function next() {
                        if (item + 1 < settings.items.length) {
                            item++
                            settings.methods.liShow(undefined, item);
                        } else {
                            settings.hidden = false
                            settings.animated = false
                        }
                    }

                    return this;
                },
                option: function (option, value) {
                    if (value !== undefined) {
                        settings[option] = value
                        return this
                    }
                    return settings[option]
                }
            };
        }
        var args
        if (typeof arguments[0] === 'string') {
            var args = Array.prototype.slice.call(arguments),
                method = settings.methods[args.shift()]
            if (!method) throw ('unknown method ')
            return method.apply(this, args)
        }
        return this

    };
})(jQuery)