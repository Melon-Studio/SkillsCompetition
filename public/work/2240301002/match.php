<!--
                              _.._        ,-------------.
                           ,'      `.    ( 嗯？你瞅啥！？ )
                          /  __) __` \    `-,-----------'
                         (  (`-`(-')  ) _.-'
                         /)  \  = /  (
                        /'    |--' .  \
                       (  ,---|  `-.)__`
                        )(  `-.,--'   _`-.
                       '/,'          (  Uu",
                        (_       ,    `/,-' )
                        `.__,  : `-'/  /`--'
                          |     `--'  |
                          `   `-._   /
                           \        (
                           /\ .      \.  
                          / |` \     ,-\
                         /  \| .)   /   \
                        ( ,'|\    ,'     :
                        | \,`.`--"/      }
                        `,'    \  |,'    /
                       / "-._   `-/      |
                       "-.   "-.,'|     ;
                      /        _/["---'""]
                     :        /  |"-     '
                     '           |      /
                                 `      |
-->
<!doctype html>
<html lang="zh-CN" class="h-100">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <title>
        <?php echo $_COOKIE['title']; ?> - 辩论赛计时系统 培黎职业学院信息技术学院
    </title>
    <link rel="shortcut icon" href="./imgs/logo.png" type="image/x-icon">
    <script src="./js/jquery-3.6.0.min.js"></script>
    <link href="./css/bootstrap.min.css" rel="stylesheet">
    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }
    </style>
    <style>
        :root {
            --hue111: 223;
            --bg111: hsl(var(--hue), 10%, 90%);
            --fg111: hsl(var(--hue), 10%, 10%);
        }

        .loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
        }

        .pl,
        .pl__worm {
            animation-duration: 3s;
            animation-iteration-count: infinite;
        }

        .pl {
            animation-name: bump;
            animation-timing-function: linear;
            width: 80px;
            margin-top: 22%;
        }

        .pl__ring {
            stroke: hsla(var(--hue111), 10%, 10%, 0.1);
            transition: stroke 0.3s;
        }

        .pl__worm {
            animation-name: worm;
            animation-timing-function: cubic-bezier(0.42, 0.17, 0.75, 0.83);
        }

        /* Dark theme */
        @media (prefers-color-scheme: dark) {
            :root {
                --bg: hsl(var(--hue111), 10%, 10%);
                --fg: hsl(var(--hue111), 10%, 90%);
            }

            .pl__ring {
                stroke: hsla(var(--hue), 10%, 90%, 0.1);
            }
        }

        /* Animations */
        @keyframes bump {

            from,
            42%,
            46%,
            51%,
            55%,
            59%,
            63%,
            67%,
            71%,
            74%,
            78%,
            81%,
            85%,
            88%,
            92%,
            to {
                transform: translate(0, 0);
            }

            44% {
                transform: translate(1.33%, 6.75%);
            }

            53% {
                transform: translate(-16.67%, -0.54%);
            }

            61% {
                transform: translate(3.66%, -2.46%);
            }

            69% {
                transform: translate(-0.59%, 15.27%);
            }

            76% {
                transform: translate(-1.92%, -4.68%);
            }

            83% {
                transform: translate(9.38%, 0.96%);
            }

            90% {
                transform: translate(-4.55%, 1.98%);
            }
        }

        @keyframes worm {
            from {
                stroke-dashoffset: 10;
            }

            25% {
                stroke-dashoffset: 295;
            }

            to {
                stroke-dashoffset: 1165;
            }
        }
    </style>
    <style>
        ::-webkit-scrollbar {
            width: 6px;
            height: 10px;
        }

        ::-webkit-scrollbar-track {
            width: 6px;
            background: rgba(#101F1C, 0.1);
            background-color: black;
        }

        ::-webkit-scrollbar-thumb {
            background-color: rgba(144, 147, 153, .5);
            background-clip: padding-box;
            min-height: 28px;
            -webkit-border-radius: 2em;
            -moz-border-radius: 2em;
            border-radius: 2em;
            transition: background-color .3s;
            cursor: pointer;
        }

        ::-webkit-scrollbar-thumb:hover {
            background-color: rgba(144, 147, 153, .3);
        }
    </style>
    <link href="./css/cover.css" rel="stylesheet">
</head>

<body class="d-flex h-100 text-center text-white"
    style="background: url(./imgs/bg.jpg); background-attachment: fixed; background-repeat: no-repeat;">
    <div class="loading" style="z-index: 999999; display:block; background-color:black;">
        <svg class="pl" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="hsl(193,90%,55%)" />
                    <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                </linearGradient>
            </defs>
            <circle class="pl__ring" r="56" cx="64" cy="64" fill="none" stroke="hsla(0,10%,10%,0.1)" stroke-width="16"
                stroke-linecap="round" />
            <path class="pl__worm"
                d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z"
                fill="none" stroke="url(#pl-grad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"
                stroke-dasharray="44 1111" stroke-dashoffset="10" />
        </svg>
        <p>加载中</p>
    </div>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header class="mb-auto">
            <div>
                <h3 class="float-md-start mb-0"><img src="./imgs/logo.png" alt="logo" style="width: 1.5em;"> 辩论赛计时系统
                </h3>
                <nav class="nav nav-masthead justify-content-center float-md-end">
                    <a class="nav-link active" id="menu1">辩论赛</a>
                    <a class="nav-link" id="menu2">规则</a>
                    <a class="nav-link" id="menu3">关于</a>
                </nav>
            </div>
        </header>

        <main class="px-3" id="main">
            <style>
                .text-left {
                    text-align: center;
                    font-size: 25px;
                }

                .text-right {
                    text-align: center;
                    font-size: 25px;
                }

                #djs1 {
                    font-size: 80px;
                }

                #djs2 {
                    font-size: 80px;
                }
            </style>
            <h4 style="margin-bottom: 6.5rem;">
                <?echo $_COOKIE['title'];?><br>
                <? 
                 if ($_COOKIE['id'] == '1') {
                      echo $_COOKIE['class'];
                 }
                 ?>
            </h4>
            <h4 id="allTitle" style="display: none;">攻辩阶段</h4>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="text-left">
                            正方<br>
                            <? 
                            if ($_COOKIE['id'] == '0') {
                                echo $_COOKIE['square'];
                            }
                            ?>
                        </div>
                        <p id="djs1">
                            00:00
                        </p>
                        <button class="btn border-white bg-white btn-secondary z-start">开始</button>
                        <button class="btn border-white bg-white btn-secondary z-stop">暂停</button>
                        <button class="btn border-white bg-white btn-secondary z-reset">重置</button>
                    </div>
                    <div class="col">

                    </div>
                    <div class="col">
                        <div class="text-right">
                            反方<br>
                            <? 
                            if ($_COOKIE['id'] == '0') {
                                echo $_COOKIE['class'];
                            }
                            ?>
                        </div>
                        <p id="djs2">
                            00:00
                        </p>
                        <button class="btn border-white bg-white btn-secondary f-start">开始</button>
                        <button class="btn border-white bg-white btn-secondary f-stop">暂停</button>
                        <button class="btn border-white bg-white btn-secondary f-reset">重置</button>
                    </div>
                </div>
            </div>
            <p class="lead" id="test"></p>
            <p class="lead">
                <button class="btn btn-lg btn-secondary fw-bold border-white bg-white all-start"
                    type="button">开始</button>
            </p>

        </main>
        <audio id="player" src="" style="visibility: hidden; width: 0;height: 0;"></audio>
        <footer class="mt-auto text-white-50">
            <p class="text-center" style="font-size: 12px;">Copyright © 2022 BaoGuoan. All rights
                reserved.<br>本系统独家授权给培黎职业学院使用，如需定制联系邮箱：dooper@88.com</p>
        </footer>
    </div>
    <script>
        $(function () {
            var main = $('#main');
            var menu1 = $('#menu1');
            var menu2 = $('#menu2');
            var menu3 = $('#menu3');
            //点击菜单栏触发事件
            menu2.on('click', function () {
                var url = '/rule.html';
                console.log(url);
                $('#main').load(url + ' #main > *');
                menu1.removeAttr('class', 'active');
                menu3.removeAttr('class', 'active');
                menu1.attr('class', 'nav-link');
                menu3.attr('class', 'nav-link');
                menu2.attr('class', 'nav-link active');
                return false;
            });
            menu1.on('click', function () {
                var url = '/match.php';
                console.log(url);
                $('#main').load(url + ' #main > *');
                menu1.attr('class', 'nav-link active');
                menu3.removeAttr('class', 'active');
                menu2.removeAttr('class', 'active');
                menu3.attr('class', 'nav-link');
                menu2.attr('class', 'nav-link');
                return false;
            });
            menu3.on('click', function () {
                var url = '/about.html';
                console.log(url);
                $('#main').load(url + ' #main > *');
                menu1.removeAttr('class', 'active');
                menu3.attr('class', 'nav-link active');
                menu2.removeAttr('class', 'active');
                menu2.attr('class', 'nav-link');
                menu1.attr('class', 'nav-link');
                return false;
            });
        });
        //页面加载
        $(function () {
            setTimeout(function () {
                $(".loading").hide();
            }, 2000);
        });

    </script>
    <script>
        var startStaue = 0;
        let num;
        let timer;
        $(function () {
            $('.z-start').click(function () {
                if(startStaue == 0){
                    alert('请先点击下方中间开始');
                }else if(startStaue == 1){
                    playerControl('01');
                    num = 180;
                    $('#djs1').text('00');
                    clearInterval(timer);
                    timer = setInterval(function(){
                        num--;
                        if(num){
                            $('#djs1').text(num);
                        }else{
                            timer=clearInterval(timer);
                        }
                    },1000);
                }
            });
            $('.z-stop').click(function () {
                if(startStaue == 0){
                    alert('请先点击下方中间开始');
                };
            });
            $('.z-reset').click(function () {
                if(startStaue == 0){
                    alert('请先点击下方中间开始');
                };
            });
            $('.f-start').click(function () {
                if(startStaue == 0){
                    alert('请先点击下方中间开始');
                }else if(startStaue == 1){
                    playerControl('02');
                    num = 180;
                    $('#djs2').text('00');
                    clearInterval(timer);
                    timer = setInterval(function(){
                        num--;
                        if(num){
                            $('#djs2').text(num);
                        }else{
                            timer=clearInterval(timer);
                        }
                    },1000);
                };
            });
            $('.f-stop').click(function () {
                if(startStaue == 0){
                    alert('请先点击下方中间开始');
                };
            });
            $('.f-reset').click(function () {
                if(startStaue == 0){
                    alert('请先点击下方中间开始');
                };
            });
            //全局开始
            $('.all-start').click(function () {
                    if(startStaue == 0){
                        $('.all-start').hide();
                        playerControl('tip');
                        setTimeout(function () {
                            $('#allTitle').show();
                            $('#djs1').text('00');
                            $('#djs2').text('00');
                            playerControl('00');
                            startStaue = 1;
                        }, 12000);
                    }
                
            });
            if(('#djs1').text == '30'){
                playerControl('lings_01.mp3');
            }else if(('#djs1').text == '00'){
                playerControl('lings_02.mp3');
            }
            if(('#djs2').text == '30'){
                playerControl('lings_01.mp3');
            }else if(('#djs2').text == '00'){
                playerControl('lings_02.mp3');
            }
        });
        function playerControl(path){
            var audioEle = document.getElementById("player");
            audioEle.src='./voice/'+path+'.mp3';
            audioEle.load();
            if (audioEle.paused){
                audioEle.play();
            }else {
                audioEle.pause();
            }
        };
        
    </script>
</body>

</html>