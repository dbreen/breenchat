<!doctype html>
<html>
<head>
<title>BreenChat</title>
<link href="/static/css/bootstrap.css" rel="stylesheet">
<link href="/static/css/styles.css" rel="stylesheet">
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="/static/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/static/js/chat.js"></script>
</head>
<body>

<div class="container">

	<div class="navbar navbar-default">
	    <div class="container-fluid">
            <div class="navbar-header">
    	        <a class="navbar-brand">BreenChat</a>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#">@<span id="my-handle"></span></a></li>
            </ul>
	    </div>
	</div>

	<div id="chat-panel">

        <div class="row">
    		<div class="col-sm-8 col-lg-8">
                <div id="log"></div>
                <form id="chatform">
                    <div class="input-group">
                        <input id="chat" type="text" class="form-control" />
                        <span class="input-group-btn">
                            <button class="btn btn-primary" id="send">Send</button>
                        </span>
                    </div>
                </form>
    		</div>
            <div class="col-sm-4 col-lg-4">
                <div id="user-panel" class="panel panel-primary">
                    <div class="panel-heading">
                        Users <span id="usercount" class="badge"></span>
                    </div>

                    <ul id="userlist" class="list-group"></ul>
                </div>
            </div>
        </div>

	</div>

	<div class="modal fade" id="handle-dlg" role="dialog">
		<div class="modal-dialog" role="document">
    		<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h3>Choose a Handle</h3>
				</div>
				<div class="modal-body">
					<form class="form-inline" id="handle-form">
						<div class="input-group input-group-lg">
							<span class="input-group-addon">@</span>
							<input type="text" class="form-control" placeholder="Handle" id="handle">
						</div>
					</form>
				</div>
				<div class="modal-footer">
				<a href="#" class="btn btn-primary btn-lg" data-dismiss="modal">Start Chatting</a>
				</div>
			</div>
		</div>
	</div>

</div>

<script>
window.chat = new ChatServer('{{endpoint}}');
</script>
</body>
</html>

