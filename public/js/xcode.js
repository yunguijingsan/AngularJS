var App = {body: $("body"),
    scrollSpeed: 1000,
    portfolioInterval: 100,
    wrapper: $("#wrapper"),
    portfolio: $(".portfolio-list"),
    programs: $(".programs-list"),
    header: $(".top-header"),
    eventsBox: $("#events"),
    cForm: $("#cantact-form"),
    document: $(document),
    pageTimeout: null,
    clickTimeout: null,
    carouselUrl: "scripts/libs/owl.carousel.min.js",
    mixituplUrl: "scripts/libs/jquery.mixitup.min.js",
    isMobile: {
        Android: function () {
            return navigator.userAgent.match(/Android/i)
        }, iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        }, Windows: function () {
            return navigator.userAgent.match(/IEMobile/i)
        }, any: function () {
            return(App.isMobile.Android() || App.isMobile.iOS() || App.isMobile.Windows())
        }}, portfolioTpl: ['<div class="portfolio-view-wrapper">', '<div class="view-loading"><p>Loading Data</p></div>', '<a href="javascript:" id="close-view" class="icon icon-close close-view">X</a>', '<div id="showcase" class="portfolio-view-box"></div>', '<div id="mockup" class="mockup">', '<div class="case-view-controls">', '<div data-behavior="caseView" data-arrow="p" class="view-prev"></div>', '<div data-behavior="caseView" data-arrow="n" class="view-next"></div>', "</div>", "</div>", "</div>"].join("\n"), pageintn: function () {
        var b = window.innerHeight, a = App.header.height();
        $(".show-banner").css({height: (b) + "px"})
    }, addWaypoint: function () {
        if (!App.isMobile.any()) {
            $(".animate").viewportChecker({classToAdd: "animated visible fadeInUp", offset: 200});
            $("#services-item > div").viewportChecker({classToAdd: "animated", offset: 300, repeat: true, callbackFunction: function (a, b) {
                var c = a.index() % 3;
                setTimeout(function () {
                    a.addClass("visible bounceIn")
                }, c * 400)
            }});
            $("#services-item > div").viewportChecker({classToAdd: "animated", offset: 300, repeat: true, callbackFunction: function (a, b) {
                var c = a.index() % 3;
                setTimeout(function () {
                    a.addClass("visible bounceIn")
                }, c * 400)
            }});
            App.programs.find("li").viewportChecker({classToAdd: "animated", offset: 300, repeat: true, callbackFunction: function (a, b) {
                var c = a.index() % 4;
                setTimeout(function () {
                    a.addClass("visible rotateIn")
                }, c * 400)
            }});
            $(".navigation").find("li").each(function () {
                var a = $(this), b = a.index() % 5;
                setTimeout(function () {
                    a.addClass("animated visible fadeInDown")
                }, b * 400)
            });
            setTimeout(function () {
                $(".title-description >strong").addClass("animated visible fadeInUp");
                $(".service-list > span").each(function () {
                    var a = $(this), b = a.index() % 3;
                    setTimeout(function () {
                        a.addClass("animated visible fadeInRightShort")
                    }, b * 600)
                })
            }, 3000);
            $(".events-box").find(".event-item").viewportChecker({classToAdd: "animated", offset: 280, callbackFunction: function (a, b) {
                var c = a.index() % 5;
                $(".events-box").find(".line").css({width: "100%", overflow: "visible", visibility: "visible"});
                $(".events-box").find(".scaleIn").addClass("visible");
                setTimeout(function () {
                    a.addClass("visible");
                    a.find("p").addClass("animated rotateIn visible");
                    a.find(".text-box").addClass("animated rubberBand visible");
                    a.find("[data-behavior]").trigger("click")
                }, c * 1000)
            }});
            $(".location-box").viewportChecker({classToAdd: "animated", offset: 350, callbackFunction: function (a, b) {
                $(".title-line").find("span").addClass("visible");
                $(".show-line").css({width: "100%", overflow: "visible"});
                setTimeout(function () {
                    $(".title-line").find("i").addClass("visible")
                }, 1400);
                $(".events-box").find(".scaleIn").addClass("visible");
                setTimeout(function () {
                    $(".mapview").addClass("animated fadeIn visible");
                    $("#show-location").addClass("animated bounceInDown visible")
                }, 2200);
                setTimeout(function () {
                    $("#show-location").trigger("click")
                }, 3400)
            }});
            $(".share-inbox.fn").viewportChecker({classToAdd: "animated", offset: 200, callbackFunction: function (b, c) {
                b.addClass("animated rotateIn visible");
                var a = $(".hand-tap"), d = $(".sharing-line");
                a.addClass("animated fadeInUp visible");
                setTimeout(function () {
                    $("#show-share").trigger("click");
                    a.removeClass("fadeInUp").addClass("fadeOutDown")
                }, 1400);
                setTimeout(function () {
                    d.addClass("animated fadeInUp visible")
                }, 3000);
                setTimeout(function () {
                    d.find("span").addClass("visible")
                }, 4000);
                setTimeout(function () {
                    $(".goTop").addClass("visible");
                    a.remove()
                }, 5000)
            }})
        }
    }, behaviors: {scrollTo: function () {
        var a = $(this).data("id").split("#")[1];
        window.location.hash = "!" + a;
        $("html, body").animate({scrollTop: $("#" + a).offset().top - 60}, App.scrollSpeed);
        return false
    }, love: function () {
        var c = $(this), b = c.data("click"), a = c.data("liked"), d = c.html();
        $.getJSON("http://x.16code.com/data/x-like.php?callback=?").done(function (j) {
            if (j.count > a) {
                c.attr("data-liked", j.count).find("b").html(j.count);
                c.find("i").addClass("animated fadeOutUp visible");
                var e = 0, i = j.count, h = function () {
                    e += Math.ceil(i / 100);
                    e > i && (e = i);
                    c.find("b").html(e);
                    e <= i && setTimeout(h, 10)
                };
                if (typeof b === "undefined") {
                    h();
                    c.attr("data-click", "1")
                } else {
                    c.find("span").html(j.tips)
                }
            } else {
                c.find("span").html(j.tips)
            }
            setTimeout(function () {
                c.html(d)
            }, 1000)
        })
    }, scrollUp: function () {
        $("html, body").animate({scrollTop: 0}, App.scrollSpeed)
    }, switchDetail: function () {
        var b = $(this), c = b.data("caseid"), a = $(".portfolio-view-wrapper");
        a.remove();
        App.portfolio.find(".portfolio-item").first().after(App.portfolioTpl);
        App.portfolio.find("li").removeClass("active").find("img").fadeTo("slow", 0.5);
        b.attr("data-clicked", "open").parents("li").addClass("active").find("img").fadeTo("slow", 1);
        $.getJSON("http://x.16code.com/data/case-data.php?callback=?", "caseid=" + c + "").done(function (h) {
            var f = $("#showcase"), j = $("#mockup"), d = $(".portfolio-view-wrapper"), g;
            for (var e = 0; e < h.caseItems.length; e++) {
                f.append("<img src=" + h.caseItems[e].imgUrl + ">");
                j.addClass("" + h.caseDevice + "-mockup " + h.mockupColor + "");
                f.addClass("" + h.caseDevice + "")
            }
            $("html, body").animate({scrollTop: f.offset().top - 60}, 300);
            d.find("img").one("load", function () {
                console.log("img loading")
            }).each(function () {
                if (this.complete) {
                    $(this).load()
                }
                var i = j.hasClass("iphone-mockup");
                if (i == true) {
                    g = 4;
                    d.height("721px")
                } else {
                    d.height("620px");
                    g = 2
                }
                setTimeout(function () {
                    $(".view-loading").fadeOut();
                    $.getScript(App.carouselUrl, function (k, m, l) {
                        f.owlCarousel({center: true, nav: false, items: g, loop: true, margin: 30, dots: false, navContainerClass: "showcase-view-nav", navClass: ["showcase-view-prev", "showcase-view-next"]})
                    })
                }, 600);
                j.fadeIn()
            })
        }).fail(function (f, g, e) {
            var d = e;
            if (g == "timeout") {
                d = "Ajax Timeout"
            }
            $(".view-loading > p").html(d)
        })
    }, showDetail: function () {
        $(this).each(function () {
            var c = $(this), h = c.data("number");
            c.text(0);
            var d = 0, e = function () {
                d += Math.ceil(h / 100);
                d > h && (d = h);
                c.html(d);
                d <= h && setTimeout(e, 10)
            };
            e()
        })
    }, caseView: function () {
        var a = $(this).data("arrow");
        switch (a) {
            case"p":
                $(".showcase-view-prev").trigger("prev.owl");
                break;
            case"n":
                $(".showcase-view-next").trigger("next.owl");
                break
        }
    }, sharepage: function () {
        var e = $(this), c = e.text(), b = "http://x.16code.com", g = "Xdesign设计工作室", a = "http://xdesign-uploads.stor.sinaapp.com/desktop-1.png", f = "给大家分享一个不错的设计工作室!", d = "网页应用界面设计与开发";
        switch (c) {
            case"Tweibo":
                window.open(encodeURI("http://share.v.t.qq.com/index.php?c=share&a=index&url=" + b + "&appkey=801538345&title=" + g + " - " + d + "&pic=" + a + "&line1="));
                break;
            case"Qzone":
                window.open(encodeURI("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + b + "&title=" + g + "&desc=" + f + "&summary=" + d + "&site=" + g + ""));
                break;
            case"QQ":
                window.open(encodeURI("http://connect.qq.com/widget/shareqq/index.html?url=" + b + "&title=" + g + "&desc=" + f + "&summary=" + d + "&site=" + b + "&pics=" + a + ""));
                break;
            case"Sina":
                window.open(encodeURI("http://service.weibo.com/share/share.php?url=" + b + "&title=" + g + "&appkey=801538345&pic=" + a + ""));
                break;
            case"Baidu":
                window.open(encodeURI("http://i.baidu.com/store/?url=" + b + "&t=" + g + "-" + d + ""));
                break;
            case"Email":
                window.location = encodeURI("mailto:example@qq.com?&subject=" + g + "&body=" + d + "  -  " + b + "");
                break
        }
    }}, addMixitup: function () {
        if (!App.isMobile.any()) {
            $.getScript(App.mixituplUrl, function (a, c, b) {
                App.portfolio.mixItUp({selectors: {target: "li"}, controls: {enable: true}})
            })
        }
    }, mobileDevice: function () {
        if (App.isMobile.any()) {
            $.getScript(App.carouselUrl, function (a, c, b) {
                $(".mobileDevice").owlCarousel({items: 1})
            })
        }
    }, loaded: function () {
        setTimeout(function () {
            $("html, body").scrollTop(0)
        }, 1);
        window.location.hash = "!home";
        App.body.addClass("loaded");
        App.addWaypoint();
        App.mobileDevice();
        App.addMixitup()
    }, events: function () {
        $.getJSON("http://x.16code.com/data/case-list.php?callback=?", "type=case").done(function (p) {
            var o = $("#portfolio-tpl").html(), n = Handlebars.compile(o), m = p, l = n(m);
            App.portfolio.html(l);
            if (!App.isMobile.any()) {
                var q = App.portfolio.find("li"), j = q.length;
                for (var k = 0; k < j; k += 3) {
                    q.slice(k, k + 3).wrapAll("<div class='portfolio-item clearfix' />")
                }
                portfolio = App.portfolio.find("li"), portfolio.height(q.width() + 30 + "px");
                App.portfolio.find(".portfolio-item").each(function (r) {
                    var t = $(this), s = t.index() + 1;
                    t.addClass("item-" + s)
                })
            }
        });
        $.getJSON("http://x.16code.com/data/case-list.php?callback=?", "type=events").done(function (n) {
            var m = $("#events-tpl").html(), l = Handlebars.compile(m), k = n, j = l(k);
            App.eventsBox.html(j).find(".event-item:odd").addClass("even")
        });
        $.getJSON("http://x.16code.com/data/case-list.php?callback=?", "type=contact").done(function (n) {
            var m = $("#contact-tpl").html(), l = Handlebars.compile(m), k = n, j = l(k);
            $("#contacts").html(j)
        });
        var e = App.programs.find("li");
        e.height(e.width() + "px");
        App.body.on("click", "[data-behavior]", function (j) {
            j.preventDefault();
            App.behaviors[$(this).data("behavior")].call(this)
        });
        $("#show-location").on("click", this, function (l) {
            l.preventDefault();
            var k = $(this), j = k.next().find("img");
            j.toggleClass("show")
        });
        $("#show-share").on("click", function (k) {
            k.preventDefault();
            var j = $(".share-inbox").find("a");
            setTimeout(function () {
                j.addClass("show");
                setTimeout(function () {
                    j.addClass("share-animated")
                }, 1800)
            }, 1000)
        });
        App.body.on("click", "#close-view", function () {
            $(".portfolio-view-wrapper").hide();
            App.portfolio.find("li").removeClass("active").find("img").fadeTo("slow", 1)
        });
        $('ul[data-spy="scroll"] > li').click(function (l) {
            l.preventDefault();
            var j = $(this), k = $(this).index() + 1;
            if (j.hasClass("active") == false) {
                j.parents("ul").find("li").removeClass("active");
                j.addClass("active")
            } else {
                j.removeClass("active")
            }
            location.hash = $(this).find("a").attr("href")
        });
        $("img").on("dragstart", function () {
            return false
        });
        App.portfolio.find("li").hover(function () {
            $(this).find(".detail").addClass("show-detail")
        }, function () {
            $(this).find(".detail").removeClass("show-detail")
        });
        App.document.on("touchend click", 'button[data-target="#navigation"]', function (j) {
            j.stopPropagation();
            j.preventDefault();
            if (j.handled !== true) {
                var k = $(this);
                k.toggleClass("active").next().slideToggle("fast");
                j.handled = true
            } else {
                return false
            }
        });
        var d = $(".contact-box .row").width(), g = $(".form-box").width(), c = $(".form-box").height();
        $(".field-control-box").css({width: (d - g - 30) + "px", height: c + "px"});
        $(".contact-fields-box").height(c + "px");
        $(".field-control").find("li").on("click", function () {
            $(this).parent("ul").find("li").removeClass("active");
            $(this).addClass("active");
            var j = $(this).data("form-type");
            App.cForm.attr("data-form-type", j);
            switch (j) {
                case"Questions":
                    $('[data-field-type="Questions"]').slideDown();
                    $('[data-field-type="Project"]').slideUp();
                    $("#emailBox").animate({"background-color": "#282E3A"}, 500);
                    if ($("#company").val() == "") {
                        $("#company").val("公司名称")
                    }
                    break;
                case"Project":
                    $('[data-field-type="Project"]').slideDown();
                    $('[data-field-type="Questions"]').slideDown();
                    $("#emailBox").animate({"background-color": "#212630"}, 500);
                    if ($("#company").val() != "" && $("#company").val() == "公司名称") {
                        $("#company").val("")
                    }
                    break
            }
            App.cForm.removeClass().addClass(j).attr("action", j)
        });
        $("head").append('<link rel="stylesheet" href="style/owl.carousel.css" /><link rel="stylesheet" href="style/owl.theme.css" />');
        $.getJSON("http://x.16code.com/data/x-like.php?callback=?").done(function (j) {
            $("#like").attr("data-liked", j.count).find("b").html(j.count)
        });
        App.cForm.on("keypress", function (j) {
            if (j.which == 13) {
                return $(this).trigger("submit")
            }
        });
        App.cForm.on("submit", function (o, q) {
            var s = App.cForm.data("form-type");
            var u = $("#name"), n = $("#phone"), j = $("#company"), p = $("input[type=budget]"), l = $("#desc");
            var m = /^[\u4E00-\u9FA5]+$/, k = /^[A-Za-z\u4e00-\u9fa5]+$/, t = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/, r = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
            setTimeout(function () {
                $('div[data-type="message"]').removeClass("is-visible")
            }, 2000);
            if (u.val().replace(/\s/ig, "").length < 2 || !m.test(u.val())) {
                u.focus().next().addClass("is-visible");
                return false
            } else {
                if (j.val().replace(/\s/ig, "").length < 4 || !k.test(j.val())) {
                    j.focus().next().addClass("is-visible");
                    return false
                } else {
                    if (!t.test(n.val())) {
                        n.focus().next().addClass("is-visible");
                        return false
                    } else {
                        if (l.val().replace(/\s/ig, "").length < 5) {
                            l.focus().next().addClass("is-visible");
                            return false
                        }
                    }
                }
            }
            $.ajax({type: "POST", url: "http://x.16code.com/data/contact.php?type=" + $(this).attr("action"), crossDomain: true, data: {type: s, data: $(this).serialize()}, dataType: "json", success: function (v) {
                if (v.success == 0) {
                    $("input.submit").val(v.msg).attr("disabled", true)
                } else {
                    $("input.submit").val(v.msg)
                }
            }});
            o.preventDefault();
            return false
        });
        $("#desc").on("blur focus keydown keypress keyup", function (j) {
            if ($(this).val().replace(/\s/ig, "").length != 0) {
                $("input[type=submit]").addClass("is-active");
                $(".verification").find(".loading-code").fadeOut("fast")
            } else {
                $("input[type=submit]").removeClass("is-active")
            }
        });
        $("#getcode_gg").on("click", function () {
            $(this).attr("src", "http://x.16code.com/data/verification.php?" + Math.random())
        });
        $(".radio").on("click", function (l) {
            $("input[type=radio]").attr("checked", false);
            var k = $(this).text(), j = $(this).prev("input[type=radio]");
            j.val(k).attr("checked", true)
        });
        var b, h = $("#navigation"), f = h.outerHeight() + 15, a = h.find("a"), i = a.map(function () {
            var j = $($(this).data("id"));
            if (j.length) {
                return j
            }
        });
        $(window).scroll(function () {
            var j = $(this).scrollTop() + f;
            var k = i.map(function () {
                if ($(this).offset().top < j) {
                    return this
                }
            });
            k = k[k.length - 1];
            var l = k && k.length ? k[0].id : "";
            if (b !== l) {
                b = l;
                a.parent().removeClass("active").end().filter("[data-id=#" + l + "]").parent().addClass("active")
            }
        });
        $("#services-item").find("a").on("click", function () {
            $("#navigation").find("a").last().click()
        })
    }};
$(window).load(function () {
    App.loaded()
});
$(document).ready(function () {
    App.events();
    App.pageintn()
});
$(window).on("resize", function () {
    if (!App.isMobile.any()) {
        App.pageintn()
    }
});
