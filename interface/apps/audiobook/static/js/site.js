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
		    this.initializePlayer();
		    this.displayPageNumber();
            this.pageInteraction();	   
            this.changePages(); 
            this.formValues();
		};	
		
		
	    /*
	     *  Store csrv token in the javascript site scope.
	     *  This will be used in ajax form submissions.
	     */		
		this.storeCsrvToken = function() 
		{
            this.csrvToken = $('input[name="csrfmiddlewaretoken"]').val();
		};
		

	    /*
	     *  Create an instance of jPlayer with no media.
	     */		
		this.initializePlayer = function()
		{
			$("#jquery_jplayer_1").jPlayer({
				ready: function (event) {},
		        swfPath: STATIC_URL + "js",
				supplied: "mp3",
				wmode: "window"
			});
		};


	    /*
	     *  Update the position and text of #page div depending
	     *  on the page that the mouse cursor is on
	     */	
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
			   mouseX = e.pageX-140; 
			   mouseY = e.pageY-70;
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
 		 *	Respond to mouse clicks on pages depending on the status of the page.  
 		 */	
 		this.pageInteraction = function() 
 		{		    
 		    var self = this;

 		    $('#sounds > a').live('click', function(e) 
 		    {
 		        e.preventDefault();
     		   	
 	        	var page_number = lib.getId($(this).attr('id'));

 		        if ($(this).hasClass('uploaded'))
 		        {
 		        	var audio_file = $('span', this).attr('id');

 		        	self.loadAudio(page_number, audio_file);
 		        }
 		        else
 		        {
		        }
				
				self.loadGoogleBookPage(page_number);


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


 		/*
 		 *	Play audio file and load page in google book
 		 */	
 		this.loadAudio = function(page_number, audio_file)
 		{
 			var self = this;

 			// play audio file
			$("#jquery_jplayer_1").jPlayer("setMedia", {
				mp3: audio_file,
			});
			$("#jquery_jplayer_1").jPlayer("play");

			self.loadGoogleBookPage(page_number);
 		};


 		/*
 		 *	Reload iframe on a selected page
 		 */	
 		this.loadGoogleBookPage = function(page_number)
 		{
 			// reload the google book frame with the selected page
			var iframe_src = $('#book iframe').attr('src');
			iframe_src = iframe_src.replace(/(lpg=).*?(&)/,'$1' + page_number + '$2');
			iframe_src = iframe_src.replace(/(&pg=).*?(&)/,'$1' + page_number + '$2');			

            $('#book iframe').attr('src', iframe_src);	
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
	};
})(jQuery);


/*
 *  Good old fashioned document-ready function call. Starting js action.
 */
$(document).ready(function()
{   
	site.init();	
});