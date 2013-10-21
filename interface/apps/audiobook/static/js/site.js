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
            //this.HandleUploadForm(); 
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
 		        if ($(this).hasClass('empty'))
 		        {
 		        	$('select#id_page').val(page_number);
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


 		/*
 		 *	Handle file upload and progress bar
 		 */	
 		this.HandleUploadForm = function() 
 		{
 			var self = this;

       		$('#upload').submit(function()
        	{
            	// Prevent multiple submits
            	if ($.data(this, 'submitted')) 
            	{
            		return false;
            	}

            	var freq = 500; // freqency of update in ms
            	var uuid = self.gen_uuid(); // id for this upload so we can fetch progress info.
            	var progress_url = 'upload_progress/'; // ajax view serving progress info

            	// Append X-Progress-ID uuid form action
            	this.action += (this.action.indexOf('?') == -1 ? '?' : '&') + 'X-Progress-ID=' + uuid;

            	var $progress = $('<div id="upload-progress" class="upload-progress"></div>').
                	appendTo('form#upload').append('<div class="progress-container"><span class="progress-info">uploading 0%</span><div class="progress-bar"></div></div>');

            	// progress bar position
            	$progress.css({
                	position: ($.browser.msie && $.browser.version < 7 )? 'absolute' : 'fixed',
                	left: '50%', marginLeft: 0-($progress.width()/2), bottom: '20%'
            	}).show();

            	// Update progress bar
            	function update_progress_info() {
                	$progress.show();
                	$.getJSON(progress_url, {'X-Progress-ID': uuid}, function(data, status)
                	{
                    	if (data) {
                    		console.log(data);
                        	var progress = parseInt(data.uploaded) / parseInt(data.length);
                        	var width = $progress.find('.progress-container').width()
                        	var progress_width = width * progress;
                        	$progress.find('.progress-bar').width(progress_width);
                        	$progress.find('.progress-info').text('uploading ' + parseInt(progress*100) + '%');
                    	}
                    	window.setTimeout(update_progress_info, freq);
                	});
            	};
            	window.setTimeout(update_progress_info, freq);

            	$.data(this, 'submitted', true); // mark form as submitted.
        	});
		};


 		/*
 		 *	Generate 32 char random uuid
 		 */	
 		this.gen_uuid = function () 
 		{
        	var uuid = ""
        	for (var i=0; i < 32; i++) 
        	{
            	uuid += Math.floor(Math.random() * 16).toString(16);
        	}
        	return uuid
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