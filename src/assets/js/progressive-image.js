function isElementVisible(el) {
    // Execute if section will be next so when it comes it
    const rect = el.getBoundingClientRect();
    const deltaHeight=-40;
    return (
      rect.top >= 0 &&
      rect.top <
        (window.innerHeight  ||
          document.documentElement.clientHeight+deltaHeight) &&
      rect.left >= 0 &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  $(document).ready(function(){
    console.log("Hie");
    loadProgressiveImage();
    $(window).on("scroll",function(){
      console.log("Window is scrolled");
      loadProgressiveImage();
  });
  })

  



  function loadProgressiveImage(){
    
    $('img[data-src]').each(function() {
      let element=$(this);
      console.log(element);
        // Check here if element is visible on the screen 
        if(isElementVisible(element[0])){
          console.log("Element is visible");
            var dataSrc=element.data("src");
            //Element is visible 
            element.attr('src',"assets/images/"+dataSrc);
        //   Remove the data-src attribute to avoid the next execution
            element.removeAttr( "data-src" );
        }
    });

  }