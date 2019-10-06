var v = new Vue({
  el: '#vue-div',
  data: {
  	headerText: 'url("../img/header-bg4.jpg");',
    message: 'Hello Vue.js!',
    examples: [
    	{
    		title: "Bathrooms",
    		desc: "more info here",
    		url: "bathrooms",
    		hasMore: true,
    		photos: [],
    	},
    	{
    		title: "Remodel",
    		desc: "more info here",
    		url: "remodel",
    		hasMore: true,
    		photos: [],
    	},
    	{
    		title: "Additions",
    		desc: "more info here",
    		url: "additions",
    		hasMore: true,
    		photos: [],
    	},
    	{
    		title: "Kitchens",
    		desc: "more info here",
    		url: "kitchens",
    		hasMore: true,
    		photos: [],
    	},
    	{
    		title: "Outdoor",
    		desc: "more info here",
    		url: "outdoor",
    		hasMore: true,
    		photos: [],
    	},
    	{
    		title: "Commercial",
    		desc: "more info here",
    		url: "commercial",
    		hasMore: true,
    		photos: [],
    	},
    ],
    bgImages: [
    	"img/examples/kitchens/n1.jpg",
    	"img/examples/kitchens/n9.jpg",
    	"img/examples/kitchens/n17.jpg",
    	"img/examples/kitchens/n22.jpg",

    ],
    bgPos: 0,
  },
  computed: {
  	headerStyle(){
  		//console.log("compute ", this.bgImages[this.bgPos])
  		return this.bgImages[this.bgPos]
  	},
  },
  methods: {
  	loadMore: function(ex){
  		//console.log("loadMore")
  		if(ex.numLoaded == null) ex.numLoaded = 0
  		if(ex.hasMore == null) ex.hasMore = true
  		if(!ex.hasMore) return
  		for (var i = ex.numLoaded + 1; i < ex.numLoaded + 11; i++){
  			var url = "img/examples/" + ex.url + "/n" + i + ".jpg";

  			checkImage(url, ex)

  			/*
  			if(imageExists(url)){
  				ex.photos.push(url)
  			}
  			else{
  				ex.hasMore = false
  			}
  			*/
  			
  		}
  		ex.numLoaded += 10
  	}

  },
  beforeMount(){
  	for (var i = 0; i < this.examples.length; i++){
  		//console.log(this.examples[i].title)
  		this.loadMore(this.examples[i])
  			
  	}
  	this.bgPos = Math.floor(Math.random() * 3) + 0  
  },
})

Vue.config.devtools = true;

function imageExists(image_url){
	$.get(image_url)
    .done(function() { 
        return true

    }).fail(function() { 
        return false
	})
	
}

function checkImage(imageSrc, ex) {
    var img = new Image();
    img.onload = function(){
    	ex.photos.push(imageSrc)
    }
    img.onerror = function(){
    	ex.hasMore = false
    }
    img.src = imageSrc;
}


$('.modal').scroll(function(){
	//console.log('SCROLL')
	if($(this).lastScrolled == null){

	}
	if($(this).find('.loadMore').visible()){
		//console.log("I see loadMore")
		//console.log($(this).attr('id'))
		var d = new Date()
		if($(this).attr('lastClicked') == null){

			$(this).attr('lastClicked', d.getTime())
			$(this).find('.loadMore').click()
			//console.log("click")

		}
		else{
			if(d.getTime() - $(this).attr('lastClicked') > 1000) $(this).find('.loadMore').click()
		}
		
	}
})




//override back button with modals
//this is very messy
//sorry mom
$('.portfolio-link').click(function(){
	history.pushState("","")
	//console.log("push history")

	//console.log("TEST")
})

window.onpopstate = function(event) {
	if($("body").attr("class") == "modal-open"){
		//console.log("push history")
		history.pushState("","")
  		$('.modal').modal('hide');
	}
	
};

$('.modal').on('hidden.bs.modal', function () {
  //console.log("pop history")
  window.history.back()
})

setInterval(function() {
  
  v.bgPos = (v.bgPos + 1) % v.bgImages.length
  //console.log("change bg ", v.bgPos)
}, 20000);