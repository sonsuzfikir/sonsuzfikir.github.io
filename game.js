const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "İstanbul'da kenar bir mahallede,yağmurlu bir havada üç yolun keşistiği bir noktada uyanıyorsun ve etrafında kimse yok. Hava karanlık ve hiçbir şey hatırlamıyorsun. Bir yöne gitmen gerekli.",
    options: [
      {
        text: "Araba seslerinin geldiği yöne doğru git.",
        setState: { araba: true },
        nextText: 2
      },
      {
        text: 'Ambulans sesinin geldiği yöne doğru git.',
		setState:{ambluans:true},
        nextText: 3
      },
		
	  {
        text: 'Kahkaha seslerinin geldiği yöne doğru git.',
		 setState:{kahkaha:true}, 
        nextText: 4
      }	
    ]
  },
  {
    id: 2,
    text: 'Şuan çevre yolunun kenarına ulaştın. Etrafında insan yok ve trafik çok yoğun değil ve yağmurun şiddeti giderek artıyor. Arabalar hızla önünden geçip gidiyorlar.',
    options: [
      {
        text: 'Otostop çekerek bir arabayı durdurmaya çalış.',
        requiredState: (currentState) => currentState.araba,
        nextText: 6
      },
      {
        text: 'Bir taksi durdur ve ona bin.',
        requiredState: (currentState) => currentState.araba,
        nextText: 1
      },
      {
        text: 'Bir kişiyle karşılaşmayı umarak yürümeye devam et.',
		requiredState: (currentState) => currentState.araba,  
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: 'Vardığın yerde tam bir kaos söz konusu. Acı içerisinde bağıran bir kişiyi ambulansa koyuyorlar. Kıyafetleri kan içerisinde. Bazı kişiler insanların olay yerini terk etmemesi gerektiğini ve polisin varmak üzere olduğunu söylüyor.',
    options: [
      {
        text: 'Kendini yaralı kişinin yakını olarak tanıt ve ambulansa bin.',
		  requiredState: (currentState) => currentState.ambluans,
        nextText: 1
      },
      {
        text: 'Olay yerinde polisi bekle',
		  requiredState: (currentState) => currentState.ambluans,
        nextText: 1
      }
    ]
  },
  {
    id: 4,
    text: 'Bir eğlenceye denk geldin. Hemen sarhoş iki kişi yanına gelip seni aralarına davet ettiler. Sana çok iyi davranıyorlar ve nedenini anlayamıyorsun. Sana yemek ve içki ikram ediyorlar. O sırada yanındaki adamın belinde bir silah olduğunu görüyorsun. Karnın çok aç.',
    options: [
      {
        text: 'Hiç bozuntuya vermeden karnını doyur.',
		  requiredState: (currentState) => currentState.kahkaha,
        nextText: 1
      },
		
		{
        text: 'Onların sandığı kişinin sen olmadığını söyle.',
		  requiredState: (currentState) => currentState.kahkaha,
        nextText: 1
      },
		
    ]
  },
  {
    id: 5,
    text: 'Yaklaşık bir saat boyunca yürüdün ama kimseye denk gelmedin. Yağmur yüzünden de sırılsıklam olmuş durumdasın. Çok yorgun durumdasın, artık yürümeye gücün yok ve karnın çok aç.',
    options: [
      {
        text: 'Otostop çekerek bir arabayı durdurmaya çalış.',
        nextText: 6
      },
      {
        text: 'Bir taksi durdur ve ona bin.',
        nextText: 1
      
      }
    ]
  },
  {
    id: 6,
    text: 'Siyah bir araba yaklaşıyor ve senin için duruyor. Arabaya biniyorsun, arabada büyük kutular var ve sana şöfor çok şaşırmış ve sinirli bir şekilde nereye gitmek istediğini soruyor. Hala hiç bir şey hatırlamıyorsun ve nereye gitmen gerektiği konusunda bir fikrin yok.',
    options: [
      {
        text: 'Seni en yakın polis merkezine bırakmasını iste.',
        nextText: 7
      },
      {
        text: "Turist olduğu, İstanbul'un en kalabalık turistik yerine gitmek istediğini söyle.",
        nextText: 1
      
      }
    ]
  },
  {
    id: 7,
    text: "Seni bir polis merkezinin önüne getiriyor ve sinirli bir şekilde eğer kendisi veya kutular hakkında polise bir şey söylersen, seni bulup öldüreceğini söylüyor. Bir anda korkunun etkisi ile kendini dışarıda buluyorsun. Araba da hızlı bir şekilde uzaklaşıyor.",
    options: [
      {
        text: "Polis merkezine gir.",
        nextText: 8
      },
      {
        text: "Panik içinde dikkatsiz bir şekilde koşmaya başla.",
        nextText: 1
      
      }
    ]
  },
  {
    id: 8,
    text: "Polis merkezine giriyorsun, girişteki polis memuru seni direkt karşılıyor ve senden ilk olarak pasaportunu istiyor. Cebini kontrol ettiğinde üzerinde herhangi bir belge olmadığını fark ediyorsun.",
    options: [
      {
        text: "Polise gerçekleri yani bilmediğin bir yerde uyandığını ve hiçbir şey hatırlamadığını söyle.",
        nextText: 9
      },
	  {
	  	text:"Aniden polis merkezinden kaçmaya başla.",
		nextText: 4
	  }
    ]
  },
  {
    id: 9,
    text: "Polis çok şaşırdı. Hemen seni bir odaya alıp, sana biraz yiyecek verdiler. Odada yemeğini yerken bir dedektif içeri girdi. Kim olduğunu araştırdıklarını ve bir haftadır kayıp olan birisine çok benzediğini söylüyor. Bir bilgisayar programı sayesinde yüzlerinizin %98 oranında eşleştiğinden bahsediyor. Kafan iyice karışıyor, eğer o kişi sensen bir haftadır neredeydin?",
    options: [
      {
        text: "Kayıp kişinin ailesi geldi. Senin ile görüşmek istiyorlar. Acaba sen onların çocuğu musun? Aile ile görüş.",
        nextText: 11
      },
		{
        text: "Şu anda hazır olmadığını, biraz dinlenmek istediğini söyle. ",
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: "Dedektif seni zorlamadı. Bulunduğun oda da artık yalnızsın. Raflardaki kitaplara bakıyorsun. Çok büyük bir kitap en tepede dikkatini çekti. Ona ulaşmaya çalışıyorsun. Tam yakaladım derken, birden bire dengeni kaybedip yere düşüyorsun, aşırı büyük bir kitap olan Rusça sözlük kafana düşüyor ve beynin zarar görüyor. Komaya girip, felç kalıyorsun. Kimliğin asla belirlenemiyor ve hiç kimse olarak Rusça merakın yüzünden ölüyorsun.",
    options: [
      {
        text: "...Oyuna Tekrar Başla...",
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: "Senin amcan olduğunu söyleyen bir adam ve onun eşi aniden sana sarılmaya başladılar. Seni çok özlediklerini, hep seni aradıklarından bahsediyorlar. O heyecanla amcan sana bir piyango bileti gösterip, senin olduğunu söylüyor. Sen hiçbir şey anlamayıp 'Bu ne?' diye soruyorsun. Bu piyango biletine en büyük ikramiyenin çıktığını ve biletin sana ait olduğunu söylüyor.",
    options: [
      {
        text: "Bileti kabul al ve onların yeğeni olduğunu kabul et.",
        nextText: 12
      },
	  {
		  text: "Onları hatırlamadığını, şu anda kim olduğunu bilmediğini ve bileti alamacağını söyle.",
		  nextText: 13
	  }
    ]
  },
	{
		id:12,
		text:"Artık bir milyonersin. Kendine çok lüks bir ev aldın. Hayatında her şey yolunda ve çok mutlusun. İki mutlıu yılın ardından sonra evine polis geldi. Gerçek kimliğini tespit edildiğini ve senin farklı bir kişi olduğun anlaşıldı ve hakkında dolandırıcılık suçundan dava açıldı. Soruşturma devam ederken hapiste kafana çok çok büyük bir Türkçe grammer kitabı düştü. Kitap yüzünden 5 yıl komada kalıp ve ölüyorsun.",
		options: [
      {
        text: "...Oyuna Tekrar Başla...",
        nextText: -1
      }
    ]
	},
	{
    id: 13,
    text: "O sırada dedektif içeri giriyor ve seni polis merkezine getiren kişi hakkında sorular soruyor. Seni polis merkezine getiren kişinin tehditini hatırlayıp ürküyorsun. O kişiyi tanımadığını, sadece arabasıyla seni polis buraya getirdiğini söylüyorsun. Dedektif sözünü kesip diyor ki: 'O kişi bir katil ve şu anda diğer polisler onu buraya getiriyor. Arabasındaki kutularda vücut parçaları var. Kutular üzerinde senin de parmak izin var. Senden de şüpheleniyoruz.' Sen şok oluyorsun.",
    options: [
      {
        text: "Dedektife şöfor tarafından tehdit edildiğni söyle ve suçsuz olduğun konusunda dedektifi ikna etmeye çalış.",
        nextText: 14
      },
	  {
		  text: "Şöforün tehditi yüzünden korktuğun için tehdit hakkında hiçbir şey söyleme. Şimdilik bekle.",
		  nextText: 1
	  }
    ]
  },
	{
    id: 14,
    text: "Dedektif seni dikkatle dinledi. Şimdilik seni şöfor ile görüştürmeyeceğini söyledi. Seni ayrı bir odaya koydular ve orada bekletildin. Bir saat sonra dedektif odaya geldi ve dedi ki:'Arabadaki ceset senin yüzün ile eşleşen kişiye ait. Yani neredeyse ikiz kardeşler gibisiniz. Fakat şöforün dediğine göre, sen kendisine o kişiyi öldürmesi için para veren, kendisine güvenmediğin için şuan kim olduğunu hatırlamayan bir kişi olarak rol yapan ve şuan onu katil olarak yakalatıp ondan kurtulmak isteyen birisin.'",
    options: [
      {
        text: "Sinirden ceketini yere fırlat.",
        nextText: 12
      },
	  {
		  text: "Sakin bir şekilde bekle.",
		  nextText: 1
	  }
    ]
  },
	{
    id: 14,
    text: "Ceketinden bir fotoğraf düştü. Fotoğrafta üç kişi gözüküyor. Sen, şoför ve ölen kişi. Ölen kişiyle çok benziyorsunuz. Tek farkınız kollarınızdaki dövme. Onda dövme var, sende yok. ",
    options: [
      {
        text: "Sinirden ceketini yere fırlat.",
        nextText: 12
      },
	  {
		  text: "Sakin bir şekilde bekle.",
		  nextText: 1
	  }
    ]
  }
	
]

startGame()