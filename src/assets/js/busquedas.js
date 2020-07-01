$(document).ready(function () {
  $("#bnt-vermas").click(function () {
    // $(".filtroOculto").slideToggle("slow");
    // console.log($(".filtroOculto").css("display"));
    // if ($(".filtroOculto").css("display") === "block") {
    //   $("#vermas").text("Ver Menos");
    //   console.log("cambio ver menos");
    //   $(".filtroOculto").css("display", "none");
    // }
    // if ($(".filtroOculto").css("display") === "none") {
    //   $("#vermas").text("Ver Mas");
    //   console.log("cambio ver mas");
    //   $(".filtroOculto").css("display", "block");
    // }
    console.log($(".filtroOculto").css("display"));
    if($(".filtroOculto").css("display") === 'none'){
        $('.filtroOculto').toggle("slow");
        $("#bnt-vermasA").text("Ver Menos");
    }else if($(".filtroOculto").css("display") === 'block'){
        $('.filtroOculto').toggle("slow");
        $("#bnt-vermasA").text("Ver Mas");
    }
  });

  $("#bnt-vermasD").click(function () {
    console.log($(".filtroOcultoD").css("display"));
    if($(".filtroOcultoD").css("display") === 'none'){
        $('.filtroOcultoD').toggle("slow");
        $("#bnt-vermasD").text("Ver Menos");
    }else if($(".filtroOcultoD").css("display") === 'block'){
        $('.filtroOcultoD').toggle("slow");
        $("#bnt-vermasD").text("Ver Mas");
    }
  });

  $("#bnt-vermasP").click(function () {
    console.log($(".filtroOcultoP").css("display"));
    if($(".filtroOcultoP").css("display") === 'none'){
        $('.filtroOcultoP').toggle("slow");
        $("#bnt-vermasD").text("Ver Menos");
    }else if($(".filtroOcultoP").css("display") === 'block'){
        $('.filtroOcultoP').toggle("slow");
        $("#bnt-vermasP").text("Ver Mas");
    }
  });

  $("#bnt-vermasI").click(function () {
    console.log($(".filtroOcultoI").css("display"));
    if($(".filtroOcultoI").css("display") === 'none'){
        $('.filtroOcultoI').toggle("slow");
        $("#bnt-vermasI").text("Ver Menos");
    }else if($(".filtroOcultoI").css("display") === 'block'){
        $('.filtroOcultoI').toggle("slow");
        $("#bnt-vermasI").text("Ver Mas");
    }
  });

});
