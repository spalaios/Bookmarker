//listener for form
document.getElementById("myForm").addEventListener("submit",saveBookmarks);


//logic for saveBookmarks function
function saveBookmarks(event){
	

	//taking the values 
	var sitename=document.getElementById('SiteName').value;
	var siteurl=document.getElementById('SiteUrl').value;
	
	if (!formValidate(sitename, siteurl)) {
		return false;
	}


	var bookmark={
		name:sitename,
		url:siteurl
	};
	// console.log(bookmark);


	//test if bookmark is null
	if (localStorage.getItem('bookmarks') === null) {
		//Init array
		var bookmarks=[];
		//push the objects to the array
		bookmarks.push(bookmark);
		//store into the local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}
	else{
		//get the bookmarks array from the local storage
		//convert the string value into json 
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		//add to the array
		bookmarks.push(bookmark);
		//reset back to the local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}

	//clear the form
	document.getElementById('myForm').reset();

	//fetch the bookmarks 
	fetchBookmark();
	
	//stoping from submitting the form
	event.preventDefault();
}

//deleteBookmark logic
function deleteBookmark(url){
	//extracting the objects from local storage
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	//check if the passed in url matches with the bookmarks url
	for(var i=0;i<bookmarks.length;i++){
		if (bookmarks[i].url == url) {
			bookmarks.splice(i,1);
		}
	}

	//reset the local storage 
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	//fetch the bookmarks 
	fetchBookmark();

	
}

//fetch the bookmarks array from the local storage
function fetchBookmark(){
	//get the bookmarks array from the local storage
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	//get the bookmarkresults element
	var bookmarkresults=document.getElementById('bookmarkresults');

	bookmarkresults.innerHTML='';
	//get all the objects bookmarks
	for(var i=0;i<bookmarks.length;i++){
		var name=bookmarks[i].name;
		var url=bookmarks[i].url;

		bookmarkresults.innerHTML+='<div class="well">'+
									'<h3>'+name+" "+
									'<a class="btn btn-default" target="_blank" href=" '+url+' ">Visit</a>'+' '+
									'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'+

									'</h3>'+
									'</div>';
	}

}

//form validation
function formValidate(sitename,siteurl){
	//alert when forms are blank
	if(!sitename || !siteurl){
		alert('Please fill the form');
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

     if (!siteurl.match(regex)) {
     	alert('Please fill in valid URL');
     	return false;
     }
     return true;
}