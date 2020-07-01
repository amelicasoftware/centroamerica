function openNav() {
    console.log('muestro barra');
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("social").style.display = "none";
}

function closeNav() {
    console.log('cierro barra');
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("social").style.display = "block";
}


window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    // if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    //     document.getElementById("header").style.paddingTop = "0px";
    // } else {
    //     document.getElementById("header").style.paddingTop = "50px";
    // }

    // console.log(document.documentElement.scrollTop);

    
}


$(function() {
    $(window).scroll(function() {
        // console.log($("#menu1").offset());
  if ($(window).scrollTop() + 60 >= $("#menu1").offset().top) {
    // $("#caja-flotante").fadeIn();//.fadeOut();
    $("#menu2").css('display','block');
    $("#header").css('opacity', 1);
    // console.log('aqui toy');
  } else {
    // $("#caja-flotante").fadeOut();//.fadeIn();
    $("#menu2").css('display','none');
    $("#header").css('opacity', 0.9);
    // console.log('aqui no toy');

  }
    });
  });


$(document).ready(function() {

    var banderaRed = false;
    
    

    $('#adelante').click(function() {
        console.log($("#contenedor-fichas").scrollLeft());
        let posicion = $("#contenedor-fichas").scrollLeft();
        $("#contenedor-fichas").scrollLeft(posicion + 500);
    });
    $('#atras').click(function() {
        console.log($("#contenedor-fichas").scrollLeft());
        let posicion = $("#contenedor-fichas").scrollLeft();
        $("#contenedor-fichas").scrollLeft(posicion - 500);
    });

    $('#adelante-r').click(function() {
        console.log($("#contenedor-fichas-r").scrollLeft());
        let posicion = $("#contenedor-fichas-r").scrollLeft();
        $("#contenedor-fichas-r").scrollLeft(posicion + 500);
    });
    $('#atras-r').click(function() {
        console.log($("#contenedor-fichas-r").scrollLeft());
        let posicion = $("#contenedor-fichas-r").scrollLeft();
        $("#contenedor-fichas-r").scrollLeft(posicion - 500);
    });

    $(window).scroll(function() {

        if(!banderaRed){
            console.log('cargo red');
            cargarRed();
            banderaRed = true;
        }        

        var windowHeight = $(window).scrollTop();

        var seccionNube = $("#contenedor-nube").offset();
        var seccionMapa = $("#contenedor-mapa").offset();
        var seccionDocumentos = $("#contenedor-ultimos-documentos2").offset();
        var seccionFooter = $("#footer").offset();
        var menuFlotante = $("#menu-documentos").offset();
        var menuBuscador = $("#menu-buscador").offset();
        var menuNube = $("#menu-nube").offset();
        var menuPais = $("#menu-pais").offset();
        seccionNube = seccionNube.top;
        seccionDocumentos = seccionDocumentos.top;
        seccionMapa = seccionMapa.top;
        menuFlotante = menuFlotante.top;
        seccionFooter = seccionFooter.top;
        menuBuscador = menuBuscador.top;
        menuNube = menuNube.top;
        menuPais = menuPais.top;
        //console.log(menuFlotante);

        comparaPosicion(menuFlotante, seccionNube, seccionMapa, seccionDocumentos, seccionFooter, 'menu-documentos', 'documentos');
        comparaPosicion(menuBuscador, seccionNube, seccionMapa, seccionDocumentos, seccionFooter, 'menu-buscador', 'buscador');
        comparaPosicion(menuNube, seccionNube, seccionMapa, seccionDocumentos, seccionFooter, 'menu-nube', 'nube');
        comparaPosicion(menuPais, seccionNube, seccionMapa, seccionDocumentos, seccionFooter, 'menu-pais', 'pais');
        comparaPosicion(menuPais, seccionNube, seccionMapa, seccionDocumentos, seccionFooter, 'menu-red', 'red');
        comparaPosicion(menuPais, seccionNube, seccionMapa, seccionDocumentos, seccionFooter, 'menu-sql', 'sql');
    });

    function comparaPosicion(menuFlotante, seccion1, seccion2, seccion3, seccion4, id, img) {
        //console.log('posisciones==' + seccion1 + ", "+ seccion2 + ", "+ seccion3 + ", "+ seccion4);
        if ((menuFlotante >= seccion1 && menuFlotante <= seccion2) || (menuFlotante >= seccion3 && menuFlotante <= seccion4)) {
            //console.log('aqui cambio..');
            $("#" + id).css('background-image', 'url(assets/img/' + img + '-a.png)');
        } else {
            $("#" + id).css('background-image', 'url(assets/img/' + img + '.png)');
        }
    }

    $("#btn-buscador").click(function() {
        $('html, body').animate({
            scrollTop: $("#contenedor-banner").offset().top
        });
    });

    $("#btn-nube").click(function() {
        $('html, body').animate({
            scrollTop: $("#nube-palabras").offset().top
        });
    });

    $("#btn-pais").click(function() {
        $('html, body').animate({
            scrollTop: $("#mapa-paises").offset().top
        });
    });

    $("#btn-documentos").click(function() {
        $('html, body').animate({
            scrollTop: $("#contenedor-ultimos-documentos").offset().top
        });
    });

    $("#btn-red").click(function() {
        $('html, body').animate({
            scrollTop: $("#red-conceptos").offset().top
        });
    });

    $("#btn-sql").click(function() {
        $('html, body').animate({
            scrollTop: $("#sparql").offset().top
        });
    });


    //menu2
    $(".btn-representacion").click(function() {
        $('html, body').animate({
            scrollTop: $("#red-conceptos").offset().top
        });
    });

    $(".btn-tema").click(function() {
        $('html, body').animate({
            scrollTop: $("#contenedor-nube").offset().top
        });
    });

    $(".btn-pais").click(function() {
        $('html, body').animate({
            scrollTop: $("#contenedor-mapa").offset().top
        });
    });

    $(".btn-recientes").click(function() {
        $('html, body').animate({
            scrollTop: $("#contenedor-ultimos-documentos").offset().top
        });
    });

    $(".btn-sparql").click(function() {
        $('html, body').animate({
            scrollTop: $("#sparql").offset().top
        });
    });

    

});