/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */

$(document).ready(function(){$(document).foundation();$("#main_particles").particleground({dotColor:"#62ddff",lineColor:"#62ddff",maxSpeedX:0.7,maxSpeedY:0.7,directionY:"down",density:9500,particleRadius:1,proximity:130,parallaxMultiplier:25});$("#form-particles").particleground({dotColor:"#fff",lineColor:"#fff",maxSpeedX:0.7,maxSpeedY:0.7,directionY:"down",density:9500,particleRadius:1,proximity:130,parallaxMultiplier:25});$("#slick-carousel").slick({slidesToShow:3,slidesToScroll:1,arrows:false,autoplay:true,autoplaySpeed:2000,responsive:[{breakpoint:768,settings:{slidesToShow:2}},{breakpoint:480,settings:{slidesToShow:1}}]});$("#menu-main-menu-1 > li.menu-item-20").addClass("disabled");$("#wpcf7-f95-o3").addClass("callout");$(".wpcf7-submit").addClass("large expanded button");$(window).resize(tableStack);tableStack();setTimeout("window.dispatchEvent(new Event('resize'));",1500)});function tableStack(){if($(window).width()<=900){$("#partners-table").addClass("stack")}else{$("#partners-table").removeClass("stack")}};