$(document).ready(function(){
    $(".playerPick").on("click", function (){
        $(".playerPick").not(this).insertAfter("#enemies").removeClass("playerPick").addClass("enemy").off("click");
        $(this).insertAfter("#yourChar");
        $(".enemy").on("click", function (){
            $(this).insertAfter("#defend");
            
        })
    });
    
})