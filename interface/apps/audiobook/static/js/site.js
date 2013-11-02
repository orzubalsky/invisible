/*
 *  "Invisible"
 *  @authors The Youngest, (youngestforever@gmail.com), 2013
 *
 */

;(function($){
	var site = window.site = new function() 
	{	    
	    this.playingElement = '';
	    this.csrvToken = '';
	    
	    /*
	     *  These functions are called when the document loads
	     */
		this.init = function() 
		{		
		    this.storeCsrvToken();
		    this.initializePlayer();
		   
		    //this.displayPageNumber();
            //this.pageInteraction();
          
            this.chunkInteraction(); 
            this.formInteraction();  
			this.menuInteraction();
          	this.scrollInteraction();
            //this.HandleUploadForm(); 
			
			
		};	
		
		
		/*	Invisibility shield- this makes everything invisible until you 
			mouseover it.
		*/
		this.menuInteraction = function()
		{
			var self = this;

			// the menu should be hidden on pageload
			// a click on any element should make it visible
			$(document).click(function(e)
			{
				if (!$('#menu').is(":visible"))
				{
					$('#menu').fadeIn();	
				}
			});

			$('body.uploading').live('click', function(e)
			{
				if( e.target !== this ) 
				{
       				return;
       			}
       			self.resetUploadingMode();
			});

			// clicking on info displays the about page
			$("#menu #info").click(function(e)
			{
				e.preventDefault();

				$("#about").fadeIn("fast");
			});
			
			// clickon on close hide the about page
			$("#about #close").click(function(e)
			{
				e.preventDefault();

				$("#about").fadeOut("fast");
			});
			
			//click on close to hide contribute info
			$("#contribute #close").click(function(e)
			{
				e.preventDefault();

				$("#contribute").fadeOut("fast");
			});
		

			$('#play').click(function(e)
			{
				e.preventDefault();

				var $element = self.getNextPlayableAudio();

				self.playElement($element);
			});

			$('#pause').click(function(e)
			{
				e.preventDefault();

				self.pausePlayer();
			});

			$('#menu #upload').click(function(e)
			{
				e.preventDefault();

				self.pausePlayer();

 		        $('body').addClass('uploading');

				$('#contribute').fadeIn();
			

			});

 		    // update file label with selected filename 
 		    // when a file is selected
			$("input#id_audio_file").change(function () 
			{
				var filename = $(this).val().split('\\').pop();
				$('#default_text').text(filename);
			});
			


		};


	    /*
	     */		
		this.chunkInteraction = function()
		{
			var self = this;

			$('.uploading #book > div').live('mouseover', function(e)
			{
				$(this).addClass('hover');
			});
			$('.uploading #book > div').live('mouseleave', function(e)
			{
				$(this).removeClass('hover');
			});			
 		    $('.uploading #book > div').live('click', function(e) 
 		    {
 		        e.preventDefault();

 	        	var chunk_number = lib.getId($(this).attr('id')); 		        
				
				var top_offset = $(this).position().top;

				$('#book > div').removeClass('selected');

 		        if ($(this).hasClass('uploaded'))
 		        {
 		        	// var audio_file = $(this).attr('id');
 		        	// self.loadAudio(audio_file, this);
 		        }
 		        else
 		        {
 		        	$(this).addClass('selected');

 		        	// update page field
 		        	$('select#id_chunk').val(chunk_number);

 		        	// re-position upload form next to the selected chunk
 		        	$('#upload_bg').css({
 		        		'top' : top_offset + 'px',
 		        	});

 		        	// display upload form
 		        	$('#upload_bg').fadeIn(300);
 		        }	    
      		});

		};




	    /*
	     *  Binds events to play submissions when text is clicked on
	     */		
		this.textInteraction = function()
		{
			var self = this;

			$('#book').live('click', function(e)
			{
				if (!$(e.target).hasClass('uploaded'))
				{
					$('.highlighted').contents().unwrap();
					$('.highlighted').remove();

					var text = self.selectText();
				}
			});
		};


		this.scrollInteraction = function()
		{
			var self = this;

			$(document).on("scroll", function(e)
			{
				if ($('body').hasClass('playing'))
				{
					var scrollTop = $(document).scrollTop();
	        		
					var $uploadedElements = $('#book .uploaded');

					for(var i=0; i<$uploadedElements.size(); i++)
					{
						var $element = $uploadedElements.eq(i);

						var elementTop = $element.position().top;

						if(elementTop > scrollTop)
						{
							console.log($element);

							self.playElement($element);

							return;
						}
					}
				}
    		});
		};


		this.playElement = function($element)
		{
			var self = this;

			self.resetUploadingMode();

			$('body').addClass('playing');

			var audio_file = $element.attr('id');

			self.loadAudio(audio_file, $element);

			$('#play').hide()
			$('#pause').show();			
		};


 		/*
 		 *	Play audio file and load page in google book
 		 */	
 		this.loadAudio = function(audio_file, element)
 		{
 			var self = this;

 			// play audio file
			$("#jquery_jplayer_1").jPlayer("setMedia", {
				mp3: audio_file,
			});
			$("#jquery_jplayer_1").jPlayer("play");

			$('#book > div').removeClass('playing');
			$(element).addClass('playing');
 		};


		this.pausePlayer = function()
		{
			$('body').removeClass('playing');			

			$('#book > div').removeClass('playing');

			$("#jquery_jplayer_1").jPlayer("pause");

			$('#pause').hide();
			$('#play').show()
		};


		this.resetUploadingMode = function()
		{			
			$('body').removeClass('uploading');

			$('#upload_bg').hide();

			$('#book > div').removeClass('hover').removeClass('selected');
		};

	    /*
	     *  Update the position and text of #page div depending
	     *  on the page that the mouse cursor is on
	     */	
		this.displayPageNumber = function()
		{
			$("#sounds a").mouseover(function()
			{
				var id_string = $(this).attr('id');
				var page_number = lib.getId(id_string);
				$('#page span').text(page_number);

				$("#page").show();

				$(this).animate({
					opacity:1
					}, 100, function() {
					// Animation complete.
				});
			});
			$("#sounds a").mouseleave(function()
			{
				$("#page").hide();

				$(this).animate({
					opacity:0
					}, 100, function() {
					// Animation complete.
				});
			});
			
			var mouseX;
			var mouseY;
			$(document).mousemove( function(e) {
			   mouseX = e.pageX+40; 
			   mouseY = e.pageY-30;
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
 		this.pageInteractions = function() 
 		{		    
 		    var self = this;

 		    $('#sounds > a').live('click', function(e) 
 		    {
 		        e.preventDefault();
				
				// update google embed to load the page     		   	
 	        	var page_number = lib.getId($(this).attr('id'));
				self.loadGoogleBookPage(page_number);

 		        if ($(this).hasClass('uploaded'))
 		        {
 		        	var audio_file = $('span', this).attr('id');

 		        	self.loadAudio(page_number, audio_file, this);
 		        }
 		        if ($(this).hasClass('empty'))
 		        {
 		        	// update page field
 		        	$('select#id_page').val(page_number);

 		        	// update file label
 		        	$('#default_text').text('choose file for Page ' + page_number);

 		        	// display upload form
 		        	$('#upload_bg').fadeIn(300);
 		        }	    
      		});

 		    // update file label with selected filename 
 		    // when a file is selected
			$("input#id_audio_file").change(function () 
			{
				var filename = $(this).val().split('\\').pop();
				$('#default_text').text(filename);
			});

 		};


 		/*
 		 *	close form interaction
 		 */	
 		this.formInteraction = function()
 		{
 			var self = this;

 			$('#close').bind('click', function(e)
 			{
 				$('#upload_bg').fadeOut(100);
			});
			

 		};


 		/*
 		 *	Try to find elements that have the class .uploaded
 		 *	and that is after the index of the currently played element
 		 *	return the first element found
 		 */	
 		this.getNextPlayableAudio = function()
 		{
 			var self = this;

			var currently_playing = $('#book .playing');

			var index = $(currently_playing).index();

			if (index < 0)
			{
				var next_elements = $('#book div');
			}
			else
			{
				var next_elements = $('#book div:gt('+index+')');				
			}

			var next_element = $(next_elements).filter('.uploaded').first();

			console.log(next_element);

			return next_element;
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

 		
		this.selectText = function()
		{
			var selection;

			try
			{
				if (window.ActiveXObject)
				{
					var c = document.selection.createRange();
					return c.htmlText;
				}

				var nNd = document.createElement("span");
				
				nNd.className = "highlighted";

				selection = getSelection();
				
				var w = selection.getRangeAt(0);
				
				w.surroundContents(nNd);

				selection.removeAllRanges();
				
				return nNd.innerHTML;
			}
			catch (e) 
			{
				if (window.ActiveXObject)
				{
					return document.selection.createRange();
				}
				else 
				{
					selection = getSelection();
					
					selection.removeAllRanges();

					return selection;
				}
			};
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
			var self = this;

			// $('.jp-controls').hide();

			$("#jquery_jplayer_1").jPlayer({
				ready: function(event){},
		        swfPath: STATIC_URL + "js",
				supplied: "mp3",
				wmode: "window"
			});

			// $("#jquery_jplayer_1").bind($.jPlayer.event.ready, function(event)
			// {
			// 	$('.jp-controls').fadeIn(200);
			// });		

			$("#jquery_jplayer_1").bind($.jPlayer.event.ended, function(event)
			{
  				var $next_element = self.getNextPlayableAudio();

				var audio_file = $next_element.attr('id');
				
				self.loadAudio(audio_file, $next_element);
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

	};
})(jQuery);


/*
 *  Good old fashioned document-ready function call. Starting js action.
 */
$(document).ready(function()
{   
	site.init();	
});