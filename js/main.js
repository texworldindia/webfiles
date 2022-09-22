 
$(function() {

  rating('.rating-box');


$(document).on('click', '.open-product', function(){
  var dataID = $(this).attr('data-id');
  

    setTimeout(function() {
    galleryTop.onResize();
    galleryThumbs.onResize();
  },100)


  img_num = parseInt($(this).attr('data-img_num'));
  if(typeof img_num == 'undefined') {
    img_num = 1;
  }

getProductValue(dataID, img_num);


});


function listView(dataID, homeP) {

        coverVal = coverV();

        if(dataID == 'all') {

          $.each(coverVal, function( key, val) {
            var all = true;
            var val = val[0]['title'];
            if(homeP==true) {
              var toHome = coverVal[key][0]['toHome'];
              if(toHome == 'yes') {
                visibleThis (key, val, coverVal, all, homeP);
              }
            } else {
            visibleThis (key, val, coverVal, all);
            }
            
          });
        } else {
          var val = coverVal[dataID][0]['title'],
          all = false;
          visibleThis (dataID, val, coverVal, all);
        }

        }




if((window.location.href.indexOf('?')+1) && (! $('body').hasClass('home'))) {

  if($('body').hasClass('product-view')) {
    
    var dataID = getUrlVars()["i"],
    img_num = getUrlVars()["n"];

    
   getProductValue(dataID, img_num);
     

    var hash = getUrlVars()["h"];

    if(typeof hash != 'undefined') {

      $(window).load(function() {
      setTimeout(function() {
        $('#'+hash).ScrollTo({duration: 500});
        setTimeout(function() {
          $('#order-name').focus();
        },700)
      },1000)
      });
    }

  }

  if($('body').hasClass('products')) {
    var dataID = getUrlVars()["i"];

    /*var myVar = setInterval(function(){
      if($('body').hasClass('pace-done')) {
        listView(dataID);
        clearInterval(myVar);
      }
    }, 100);*/
      
      Pace.on('hide', function(){
        listView(dataID);
      });
    
    
  }
} else {

  if($('body').hasClass('home')) {
    homeP = true;
  }

  if($('body').hasClass('products')) {
    homeP = false;
  }

  /*var myVar = setInterval(function(){
    if($('body').hasClass('pace-done')) {
      listView('all', homeP);
      clearInterval(myVar);
    }
  }, 100);*/

  Pace.on('hide', function(){
    listView('all', homeP);
  });
    
      
    
  
  // setTimeout(function() {
  //     listView('all', homeP);
  //   },3000)
}

      
      


      function visibleThis (key, val, coverVal, all, homeP) {
        

        var title = val;
        if(! all) {
          rpt = '';
          idC = '';
          mainView =  '<div class="clearfix '+key+'"><h2 class="title text-center main-heading">'+title+'</h2></div>';
        } else {
          

        


         var oldsetID = setID,
         secVal = coverVal[key][0]['menu'].split('/')[1];


         if (typeof secVal != 'undefined') {
            mainHd = coverVal[key][0]['menu'].split('/')[0];
         } else {
            mainHd = undfndGrpName;
         }
         setID = mainHd.replace(' ', '_');
         
          if(oldsetID != setID) {
            rpt = 1;
            $('#listView .row').append('<div class="clearfix"  id=itemID'+setID+'><h2 class="title text-center main-heading">'+mainHd+'</h2></div>');
          } else {
            rpt++;
          }
          
          mainView = '<div class="'+key+'"></div>';
          idC = '#itemID'+setID;
        }

        $('#itemID'+setID).attr('data-rpt', rpt);

        $('#listView .row '+idC).append(mainView);


        $.ajax({
              method: 'GET',
              url: 'data/'+key+xten,
              dataType: 'json'
            })
          .done(function (data) {
              appendToListView(key, data, coverVal, all, title, homeP);
          })
          .fail(function () {
            alert('Data loading failed!')
          });

       }



function appendToListView(dataID, data, coverVal, all, title, homeP) {


totalItem = Object.keys(data).length;

$.each(data, function( key, val ) {

if((homeP)||(all)) {
  cls = 'allview';
  var fileName = coverVal[dataID][0]['homePhoto'];
} else {
  cls = 'null';
  fileName = data[key][0]["fileName"];
}
      var newItm = data[key][0]["new"],
      star = data[key][0]["star"],
      sNo = data[key][0]["sNo"];
      rprVal = $('#listView .'+dataID).parent().attr('data-rpt'),
      align = '';
      if (rprVal==1) {
        var align = 'centerBlock1'
      } else if (rprVal==2) {
          var align = 'col-md-offset-2'
      }
      $('#listView .'+dataID).append('<div class="col-sm-4 '+cls+' '+align+'"><div class="product-image-wrapper"><div class="single-products"><div class="productinfo text-center"><img src="images/products/'+dataID+'/'+fileName+'" alt="'+title+'" /><h2 class=new-'+newItm+'>New</h2><div class="rating-box hide'+homeP+all+'" data-star="'+star+'"></div><p>'+title+'</p></div><div class="product-overlay"><div class="overlay-content"><div class="flex ht-100"><div><a href="products.html?i='+dataID+'" class="vis'+all+' btn btn-default round-button view-more"><span><i class="fa fa-plus"></i>View More</span></a><a class="btn btn-default quick-view round-button open-product" data-id="'+dataID+'" data-img_num="'+key+'"><span><i class="fa fa-expand"></i>Quick View</span></a><a href="product-view.html?i='+dataID+'&n='+key+'" class="btn btn-default round-button view-product"><span><i class="fa fa-eye"></i>View Product</span></a></div></div></div></div></div><div class="choose"><ul class="nav nav-pills nav-justified"><li><a><i class="fa fa-info"></i>'+sNo+'</a></li><li class="item-number"><a><i class="fa fa-file-o"></i>'+key+'/'+totalItem+'</a></li></ul></div></div></div>');



  if((all) && (1 <= key)) {
          return false
  }

});
rating('#listView .rating-box');
}



// -------------------------------------------------------------------------------




function getProductValue(dataID, img_num) {



  $('.detail-vis').attr('id', dataID);
  $('.overlay-popup').addClass('visible active');

  var tempOpen = $('#'+dataID).attr('data-temp');

  if(tempOpen !=dataID) {
    $('#'+dataID).find('.swiper-slide, .tags-entry a, .tags-entry i').remove();
    // $('#'+dataID).find('').remove();

    $.ajax({
      method: 'GET',
      url: 'data/'+dataID+xten,
      dataType: 'json'
    })
    .done(function (data) {
      getContents(0, data, dataID)
      appends(dataID, data);
    })
    .fail(function () {
      alert('Data loading failed!')
    });
  }


  if($('body').hasClass('product-view')) {

    $(window).load(function() {
     setTimeout(function() {
      if (0 < img_num ) {
        goTo = img_num;
      } else {
        goTo = 1;
      }
      galleryTop.slideTo(goTo-1);
      getContents(img_num-1);
    },100);
   });

  } else {
    setTimeout(function() {
      if (0 < img_num ) {
        goTo = img_num;
      } else {
        goTo = 1;
      }
      galleryTop.slideTo(goTo-1);
      getContents(img_num-1);
    },60);
  }


}


// function gotoImg(data) {
//   tags = valData["tags"],
//   fullTags = jQuery.param( tags ).split('&')
// }


function appends(dataID, data) {

  

coverVal = coverV();
//console.log(coverVal);
//console.log(coverVal[dataID][0]["totalImages"])

  //var totalImages = coverVal[dataID][0]["totalImages"];
if($('body').hasClass('home')) {
  var totalImages = parseInt(coverVal[dataID][0]["homeImages"]);
}
if(($('.title-content-section').find('.whole-data-'+dataID).length)<1) {
  $('.title-content-section').append('<div class="whole-data-'+dataID+'"></div>')

}
$.each(data, function( key, val ) { 
  //console.log(key);
  var fileName = data[key][0]["fileName"],
  zoomAvl = data[key][0]["zoom"];
  if (zoomAvl == 'yes') {
    zoomFile = '/zoom/';
  } else {
    zoomFile = '/';
  }
    galleryTop.appendSlide([
      // '<div class="swiper-slide"><img src="images/products/'+dataID+zoomFile+fileName+'"></div>'
      '<div class="swiper-slide" style="background-image:url(images/products/'+dataID+zoomFile+fileName+'), url(data:image/gif;base64,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); background-position: center;background-repeat: no-repeat; background-size:contain, 30px 30px"><div class="swiper-lazy-preloader"></div></div>'
      ]);
    galleryThumbs.appendSlide([
      '<div class="swiper-slide" style="background-image:url(images/products/'+dataID+'/'+fileName+')"></div>'
      ]);
  
  if(!($('.whole-data-'+dataID).hasClass('filled-data'))) {
    var createTitle = '<div class="title-main-bx caption-cont-'+dataID+' hidden" data-num="'+key+'"><h1 class="product-title">'+coverVal[dataID][0]["title"]+'</h1><h3 class="product-subtitle">'+data[key][0]["subTitle"]+'</h3><div class="product-description detail-info-entry">'+coverVal[dataID][0]["description"]+'</div></div>'
    $('.title-content-section .whole-data-'+dataID).append(createTitle);
  }

  if(totalImages <= key) {
    return false;
  }
  });

    $('.whole-data-'+dataID).addClass('filled-data');

  $('#'+dataID).attr('data-temp', dataID);


}


function getContents(index, data, dataID){

  indVal = index+1;

  if(typeof data != 'undefined') {
    valData = data;
  }

  if(typeof dataID != 'undefined') {
    id = dataID;
  }

  coverVal = coverV();
  /*var title = coverVal[id][0]["title"],
  description = coverVal[id][0]["description"],
  subTitle = valData[indVal][0]["subTitle"],*/

  sNo = valData[indVal][0]["sNo"],
  star = valData[indVal][0]["star"],
  sizes = valData[indVal][0]["sizes"].split(',')
  colors = valData[indVal][0]["colors"].split(',');
//alert(id);
 //.caption-cont-school_uniforms data-num=[0]
$('.title-main-bx').addClass('hidden');
$('.whole-data-'+id+' div[data-num='+(index+1)+']').removeClass('hidden');

// $('.whole-data-'+id).find('data-num=["'+(index+1)+'"]')
  
  // search in array

  /*for(a=1; a <=17; a++) {
     returnedData = $.grep(valData[a], function(element, index){
          return element["fileName"] == "2.jpg";
    });
    console.log(returnedData);
    }*/

// search in array

  
  $('#'+id).find('.size-entry .entry').remove();
  $('#'+id).find('.color-entry .entry').remove();

  $.each(coverVal, function(key, val) {
  titleTags = val[0]['title'];
  
    if(dataID != key) {
    $('#'+dataID).find('.tags-entry').append('<span><a href="products.html?i='+key+'">'+titleTags.replace(/\+/g, ' ')+'</a><i></i></span>');
  }
  
  });

  $.each(sizes, function(i, size) {
    $('#'+id).find('.size-entry').append('<div class="entry">'+size+'</div>')
  });

  $.each(colors, function(i, color) {
    $('#'+id).find('.color-entry').append('<div class="entry" style="background-color: '+color+'">&nbsp;</div>')
  });


  ratingBox = $('#'+id).find('.rating-box');
  ratingBox.attr('data-star', star)
  rating(ratingBox);

$('#'+id).attr('data-img_num');
$('#'+id).find('a.order-btn').attr('href', 'product-view.html?i='+id+'&n='+(indVal)+'&h='+'order-now');

  // $('#'+id).find('.product-title').text(title);
  // $('#'+id).find('.product-subtitle').text(subTitle);
  // $('#'+id).find('.product-description').text(description);
  $('#'+id).find('.current span').text(sNo);
  $('.sNo').val(sNo);
}



$('.product-view .order-btn').click(function() {
      $('#order-now').ScrollTo();
      setTimeout(function() {
        setTimeout(function() {
          $('#order-name').focus();
        },300)
      },300)
});

//swiper
setPerView();
$(window).resize(function(event) {
  setPerView();
});

function setPerView() {
sldPerView = 3;
  if($(window).width() < 991) {
    sldPerView = 2;
  } 
  if($(window).width() < 460) {
    sldPerView = 1;
  }

}

var carousalScroll = new Swiper('.carousel-track', {
  nextButton: '.right.recommended-item-control',
  prevButton: '.left.recommended-item-control',
  speed: 1000,
  autoplay: 5000,
  loop: true,
  slidesPerView: sldPerView,
        paginationClickable: true,
        spaceBetween:20
});

var galleryTop = new Swiper('.gallery-top', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 10,
         // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazyLoading: true,
        mousewheelControl: true,
        keyboardControl: true,
        // effect: 'fade',
        onSlideChangeEnd: function (swiper) {
          getContents(swiper.activeIndex)
        }
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;


//rating
function rating(thisSelector) {
  $(thisSelector).find('.star').remove();
  $(thisSelector).each(function() {
    var starNo = parseInt($(this).attr('data-star'));
    for(i = 0; i < 5; i++) {
      if(i < starNo) {
        var off = '';
      } else {
        var off = 'off';
      }
      $(this).append('<div class="star '+off+'"><i class="fa fa-star"></i></div>')
    }
  });
}





//close popup

$(document).on('keyup',function(evt) {
  if (evt.keyCode == 27) {
   closePopUp();
 }
});

$('.close-popup, .overlay-popup .close-layer').on('click', function(){
  closePopUp();
});

function closePopUp() {
  $('.overlay-popup.visible').removeClass('active');
  setTimeout(function(){$('.overlay-popup.visible').removeClass('visible');}, 500);

}

});
