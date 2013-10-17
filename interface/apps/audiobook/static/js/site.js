/*
 *  "Invisible"
 *  @authors The Youngest, (youngestforever@gmail.com), 2013
 *
 */

;(function($){
	var site = window.site = new function() 
	{	    
	    this.submissionId = 3;
	    this.playing = false;
	    this.csrvToken = '';
	    
	    /*
	     *  These functions are called when the document loads
	     */
		this.init = function() 
		{		
		    this.storeCsrvToken();
		    this.player();
		    this.displayPageNumber();
            this.pageInteraction();	   
            this.changePages(); 
            this.formValues();
		};	
		
		
		this.storeCsrvToken = function() 
		{
            this.csrvToken = $('input[name="csrfmiddlewaretoken"]').val();
		};
		

		this.player = function()
		{
			$("#jquery_jplayer_1").jPlayer({
				ready: function (event) {},
		        swfPath: STATIC_URL + "js",
				supplied: "mp3",
				wmode: "window"
			});
		};


		this.displayPageNumber = function()
		{
			$("#sounds a").hover(function()
			{
				var id_string = $(this).attr('id');
				var page_number = lib.getId(id_string);
				$('#page span').text(page_number);
				$("#page").show();
			});
			$("#sounds a").mouseleave(function()
			{
				$("#page").hide();
			});
			
			var mouseX;
			var mouseY;
			$(document).mousemove( function(e) {
			   mouseX = e.pageX+20; 
			   mouseY = e.pageY-20;
			});  
			$("#sounds").mouseover(function(){
			  $('#page').css({'top':mouseY,'left':mouseX});
			});
			
			$("#sound").hover(function() {
				$("#soundinfo").stop().fadeTo(400,.4);
			}, function() {
				$("#soundinfo").stop().fadeTo(400,0);
			});	
		};

		
 		/*
 		 *  
 		 */	
 		this.pageInteraction = function() 
 		{		    
 		    var self = this;

 		    $('#sounds > a').live('click', function(e) 
 		    {
 		        e.preventDefault();
     		   	
 		        if ($(this).hasClass('uploaded'))
 		        {
 		        	var audio_file = $('span', this).attr('id');

					$("#jquery_jplayer_1").jPlayer("setMedia", {
						mp3: audio_file,
					});
					$("#jquery_jplayer_1").jPlayer("play");
 		        }
 		        else
 		        {
 		        	alert('b');
 		        }


     		    // var container = $('#main');

      			// lib.ajax(
      			//     $(this).attr('href'), 
      			//     '{ csrfmiddlewaretoken:' + self.csrvToken + '}', 
      			//     'html', 
      			//     container, 
      			//     function(data) { $(container).empty().html(data); }
      			// ); 		    
      		});
 		};


		this.formValues = function() 
		{
        	// the input box element
			var inputbox = $('#id_author');

			// the input box's default value 
			var defaultValue = $(inputbox).val();

			$(inputbox).live('focus', function() {
				$(this).val('');
			})
			.live('blur', function() {
				if ($(this).val().length < 1) {
					$(inputbox).val(defaultValue);
				}
			});
			
        	// the input box element
			var inputbox = $('#id_message');

			// the input box's default value 
			var defaultValue = $(inputbox).val();

			$(inputbox).live('focus', function() {
				$(this).val('');
			})
			.live('blur', function() {
				if ($(this).val().length < 1) {
					$(inputbox).val(defaultValue);
				}
			});			
		};	
		
		
		this.changePages = function()
		{
		    var self = this;
		    
		    var randomIndex = lib.random(84,0);
		    var option = $('#selectPage option').eq(randomIndex);          
            $('#selectPage option').eq(randomIndex).attr('selected', 'selected');
            self.changePage(option);	    
		    
            $('#selectPage').change(function() 
            {
    		    var option = $('option:selected', this);          
                self.changePage(option);
            });		    
		};
		
		
		this.changePage = function(optionElement)
		{
            $('#pdf img').attr('src', $(optionElement).val());
			$('#id_page_number').val($(optionElement).text());		    
		};
		
		
 		/*
 		 *  Change the source of the Vimeo iFrame player 
 		 */		
		this.editIframeSrc = function(vimeoCode)
		{
		    var src = 'http://player.vimeo.com/video/' + vimeoCode + '?api=1&amp;player_id=vimeoFrame';
            $('#vimeoFrame').attr('src', src);		    
		}
		 
	};
})(jQuery);


/*
 *  Good old fashioned document-ready function call. Starting js action.
 */
$(document).ready(function()
{   
	site.init();	
});