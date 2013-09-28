//Content Header Unit v 0.1
//Free To Use and Distribute

(function( $ ) {
  $.fn.contentHeaderUnit = function(options) {

   //plug-in-dependant variables
   var mainHeaderImages = $("img[data-main]");
   var allHeaderImages = $(".headerImage");
   var numberMainImg = 0;
   var currentMainImg = 1;
   var previousTabImg;
   var numberTabImg = 0;
   var currentTabImg = 1;
   var previousMainImg;
   var readMoreButton = $(".headerContentShowHideBtn");
   var hiddenHeaderContent = $(".hiddenHeaderContent");
   var anyHeaderTab = $(".headerTabs > li");
   var firstHeaderTabClick = false;
   var header = $(".contentHeaderUnit header");
   var headerContent = $(".headerContent");
   var slideHeight = headerContent.height();
   var mainContentArea = $(".content");
   var currentTabId;
   var previousTabId;
   var existsHeaderImg = 0;
   var isSetTabInterval = false;
   var anyInnerTab = $(".innerNav > li");
   var innerTabId =1;
   var existsInnerHeaderImg = 0;


   //user-defined variables
    var speedFadeMain = options.speedFadeMain;
    var speedIntervalMain = options.speedIntervalMain;
    var speedFadeTab = options.speedFadeTab;
    var speedIntervalTab = options.speedIntervalTab;
    var speedSlideInnerContent = options.speedSlideInnerContent;


   //detect the number main header images
    mainHeaderImages.each(function(){
      numberMainImg++;
    })

    function fadeMainImg(speedFadeMain)
    {
      
      if(previousMainImg!=undefined){$("img[data-main='"+previousMainImg+"']").hide();}
      $("img[data-main='"+currentMainImg+"']").fadeIn(speedFadeMain);
      previousMainImg=currentMainImg;
      if(currentMainImg >= numberMainImg){currentMainImg=1;}else{currentMainImg++;}  
    }

    function fadeTabImg(speedFadeTab, currentTabId, numberTabImg)
    {
      //console.log("run fadeTabImg"+currentTabId+numberTabImg+currentTabImg+previousTabImg);
      if(previousTabImg!=undefined){$("img[data-tabid"+currentTabId+"='"+previousTabImg+"']").hide();}
      $("img[data-tabid"+currentTabId+"='"+currentTabImg+"']").fadeIn(speedFadeTab);
      previousTabImg=currentTabImg;
      if(currentTabImg >= numberTabImg){currentTabImg=1;}else{currentTabImg++;}  
    }

    function fadeInnerTabImg(speedFadeTab, currentTabId, innerTabId, numberTabImg)
    {
      //console.log("run fadeInnerTabImg"+currentTabId+numberTabImg+innerTabId+currentTabImg+previousTabImg);
      if(previousTabImg!=undefined){$("img[data-tabid"+currentTabId+"-subid"+innerTabId+"='"+previousTabImg+"']").hide();}
      $("img[data-tabid"+currentTabId+"-subid"+innerTabId+"='"+currentTabImg+"']").fadeIn(speedFadeTab);
      previousTabImg=currentTabImg;
      if(currentTabImg >= numberTabImg){currentTabImg=1;}else{currentTabImg++;}  
    }

    function beginTabHeaderImages()
    {
      //look for new header images associated with the tab group
        console.log("hi main tab header images");
        $("img[data-tabid"+currentTabId+"]").each(function(){
          //console.log("count imgs");
          existsHeaderImg++;

        });

        if(existsHeaderImg!=0 && existsHeaderImg<2)
        {
            window.clearInterval(mainTranistionImg);
            window.clearInterval(tabTranistionImg);
            window.clearInterval(innerTabTranistionImg);
            
            allHeaderImages.hide();

            $("img[data-tabid"+currentTabId+"='1']").fadeIn();

        }else if(existsHeaderImg>1){
            numberTabImg = existsHeaderImg;
            mainTranistionImg=window.clearInterval(mainTranistionImg);
            window.clearInterval(tabTranistionImg);
            window.clearInterval(innerTabTranistionImg);
            
            allHeaderImages.hide();
            fadeTabImg(speedFadeTab, currentTabId, numberTabImg);
            tabTranistionImg = self.setInterval(function(){fadeTabImg(speedFadeTab, currentTabId, numberTabImg)}, speedIntervalTab);
            
        }
    }

    function beginInnerTabHeaderImages()
    {
      //look for new header images associated with the inner tab group

        $("img[data-tabid"+currentTabId+"-subid"+innerTabId+"]").each(function(){
          //console.log("count inner imgs");
          existsInnerHeaderImg++;

        });

        if(existsInnerHeaderImg!=0 && existsInnerHeaderImg<2)
        {
            window.clearInterval(mainTranistionImg);
            window.clearInterval(tabTranistionImg);
            window.clearInterval(innerTabTranistionImg);
            
            allHeaderImages.hide();

            $("img[data-tabid"+currentTabId+"-subid"+innerTabId+"='1']").fadeIn();

        }else if(existsInnerHeaderImg>1){
            numberTabImg = existsInnerHeaderImg;
            window.clearInterval(mainTranistionImg);
            window.clearInterval(tabTranistionImg);
            window.clearInterval(innerTabTranistionImg);
            
            allHeaderImages.hide();
            fadeInnerTabImg(speedFadeTab, currentTabId, innerTabId, numberTabImg);
            tabTranistionImg = self.setInterval(function(){fadeInnerTabImg(speedFadeTab, currentTabId, innerTabId, numberTabImg)}, speedIntervalTab);
            
        }


    }

    var tabTranistionImg = self.setInterval(function(){fadeTabImg(speedFadeTab, currentTabId, numberTabImg)}, speedIntervalTab);
    window.clearInterval(tabTranistionImg);

    var innerTabTranistionImg = self.setInterval(function(){fadeinnerTabImg(speedFadeTab, currentTabId, innerTabId, numberTabImg)}, speedIntervalTab);
    window.clearInterval(innerTabTranistionImg);

    //itialize first main header image, then begin transitions
    fadeMainImg(speedFadeMain);
    var mainTranistionImg = self.setInterval(function(){fadeMainImg(speedFadeMain)}, speedIntervalMain);

    //toggle the initial header content
    readMoreButton.click(function(){hiddenHeaderContent.slideToggle();})

    //behavior for any tab click
    anyHeaderTab.click(function(){

      innerTabId = 1;
      $("div[data-innerContentId]").css("display", "none");
      $(".innerContent div.defaultInnerContent").css("display", "block");

      currentTabId = $(this).attr("data-tabId");
      $("li[data-tabId='"+previousTabId+"']").removeClass("selectedTab");
      $(this).addClass("selectedTab");
      
      //initial tab select behavior block detect, if not default tab group switch
      if(firstHeaderTabClick===false){
        
        firstHeaderTabClick=true;
        header.animate({height:(header.height()-slideHeight)});headerContent.slideToggle(function()
        {
          mainContentArea.show();
          $("div[data-tabId='"+currentTabId+"']").slideToggle();
        });
        //open new content areas normally
      }else{
          $("div[data-tabId='"+previousTabId+"']").hide();
          $("div[data-tabId='"+currentTabId+"']").slideToggle();
          previousTabImg = undefined;
      }

      currentTabImg=1;
      beginTabHeaderImages(); 

      previousTabId = currentTabId;
      existsHeaderImg = 0;
      existsInnerHeaderImg = 0;
    });

    anyInnerTab.click(function(){ 
      
      previousTabImg = undefined;
      //get rid of the old inner content
      $('div[data-innerContentId="'+innerTabId+'"]').hide();
      //set the new inner tab id
      innerTabId = $(this).attr('data-innerTabId');
      
      currentTabImg=1;
      if(innerTabId!=1){beginInnerTabHeaderImages();}else{beginTabHeaderImages();}

        //animate in the inner content
      $('div[data-innerContentId="'+innerTabId+'"]').css('left','-700px').css('position','relative').show(function(){$('div[data-innerContentId="'+innerTabId+'"]').animate({left:'0px'},speedSlideInnerContent);});

      existsHeaderImg = 0;
      existsInnerHeaderImg = 0;
                           
    });

  };
})( jQuery );