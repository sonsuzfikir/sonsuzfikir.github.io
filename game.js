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
    text: "İstanbul'da kenar bir mahallede,yağmurlu bir havada uyanıyorsun ve etrafında kimse yok. Hava çoktan kararmış ve hiçbir şey hatırlamıyorsun. Bir yöne gitmen gerekli./---/Ты пробуждаешься ото сна в захолустном регионе Стамбула, идёт дождь, и вокруг никого нет. Уже темно и ты ничего не помнишь. Ты можешь пойти только в одном направлении.",
    options: [
      {
        text: "Araba seslerinin geldiği yöne doğru git./--/Иди в направлении звука машины.",
        setState: { araba: true },
        nextText: 2
      },
		{text:"<<Спасибо Виктории огромное за исправление большой части моих ошибок>>"}
    ]
  },
  {
    id: 2,
    text: 'Bir çevre yolunun kenarına ulaştın. Etrafında insan yok ve trafik çok yoğun değil. Yağmurun şiddeti giderek artıyor. Arabalar hızla önünden geçip gidiyorlar./--/Ты дошёл/дошла до края кольцевой дороги. Вокруг ни людей, ни пробок на дорогах. Дождь постепенно увеличивается. Машины проносятся перед тобой. ',
    options: [
      {
        text: 'Otostop çekerek bir arabayı durdurmaya çalış./--/Попробуй жестом остановить одну машину.',
        requiredState: (currentState) => currentState.araba,
        nextText: 6
      },
      {
        text: 'Bir taksi durdur ve ona bin./--/Попробуй остановить такси.',
        requiredState: (currentState) => currentState.araba,
        nextText: 18
      },
      {
        text: 'Bir kişiyle karşılaşmayı umarak yürümeye devam et./--/Продолжай идти, надеясь встретить кого-нибудь.',
		requiredState: (currentState) => currentState.araba,  
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'Yaklaşık bir saat boyunca yürüdün ama kimseye denk gelmedin. Yağmur yüzünden de sırılsıklam olmuş durumdasın. Çok yorgun durumdasın, artık yürümeye gücün yok ve karnın çok aç./--/Ты гулял/гуляла около часа, но ты никого не встретил/встретила. Причём ты промок/промокла под дождём насквозь. Ты очень устал/устала и голоден/голодна. У тебя нет сил идти дальше.',
    options: [
      {
        text: 'Otostop çekerek bir arabayı durdurmaya çalış./--/Попробуй жестом остановить одну машину.',
        nextText: 6
      },
      {
        text: 'Bir taksi durdur ve ona bin./--/Попробуй остановить такси.',
        nextText: 18
      
      }
    ]
  },
  {
    id: 6,
    text: 'Siyah bir araba yaklaşıyor ve senin için duruyor. Arabaya biniyorsun, arabada büyük kutular var ve sana şoför çok şaşırmış ve sinirli bir şekilde nereye gitmek istediğini soruyor. Hala hiç bir şey hatırlamıyorsun ve nereye gitmen gerektiği konusunda bir fikrin yok./--/Чёрная машина подъезжает и останавливается около тебя. Ты садишься в машину. В машине лежат большие коробки, водитель очень удивлён и нервно спрашивает, куда ты хочешь поехать. Вдобавок ты ничего не помнишь и у тебя нет идей, куда поехать.',
    options: [
      {
        text: 'Seni en yakın polis merkezine bırakmasını iste./--/Попроси его отвезти тебя к ближайший полицейский участк.',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: "Seni bir polis merkezinin önüne getiriyor ve sinirli bir şekilde eğer kendisi veya kutular hakkında polise bir şey söylersen, seni bulup öldüreceğini söylüyor. Bir anda korkunun etkisi ile kendini dışarıda buluyorsun. Araba da hızlı bir şekilde uzaklaşıyor./--/Он привозит тебя к полицейскому участку и злобно говорит, что если ты расскажешь о нём или коробках, он найдёт тебя и убьёт. Ты вдруг оказался/оказалась на улице, потому что тебе очень страшно. Машина быстро уезжает.",
    options: [
      {
        text: "Polis merkezine gir./--/Заходи в полицейский участок.",
        nextText: 8
      },
      {
        text: "Panik içinde dikkatsiz bir şekilde koşmaya başla./--/Начинай хаотично бегать в приступе паники.",
        nextText: 16
      
      }
    ]
  },
  {
    id: 8,
    text: "Polis merkezine giriyorsun, girişteki polis memuru seni direkt karşılıyor ve senden ilk olarak pasaportunu istiyor. Cebini kontrol ettiğinde üzerinde herhangi bir belge olmadığını fark ediyorsun./--/Ты заходишь в полицейский участок, сотрудник полиции на входе встречает тебя  и сначала спрашивает твой паспорт. Когда ты проверяешь свой карман, ты понимаешь, что у тебя нет документа.",
    options: [
      {
        text: "Polise gerçekleri yani bilmediğin bir yerde uyandığını ve hiçbir şey hatırlamadığını söyle./--/Скажи правду полиции, что ты проснулся/проснулась в неизвестном месте и ничего не помнишь.",
        nextText: 9
      },
	  {
	  	text:"Aniden polis merkezinden kaçmaya başla./--/Внезапно начни убегать из полицейского участка",
		nextText: 16
	  }
    ]
  },
  {
    id: 9,
    text: "Polis çok şaşırdı. Hemen seni bir odaya alıp, sana biraz yiyecek verdiler. Odada yemeğini yerken bir dedektif içeri girdi. Kim olduğunu araştırdıklarını ve bir haftadır kayıp olan birisine çok benzediğini söyledi. Kafan iyice karışıyor, eğer o kişi sensen bir haftadır neredeydin?/--/Полиция очень удивлена. Тебя отвели в комнату и подали еду. Пока ты ешь, детектив входит в комнату. Он говорит, что они выяснили, что ты очень похож/похожа на человека, который считался пропавшим без вести в течение недели. Твоя сбит с толку, если ты был/была этим человеком, где ты был/была в течение недели?",
    options: [
      {
        text: "Kayıp kişinin ailesi geldi. Senin ile görüşmek istiyorlar. Acaba sen onların çocuğu musun? Aile ile görüş./--/Семья пропавшего человека пришла. Они хотят поговорить с тобой. Неужели ты их ребёнок? Поговори с семьёй.",
        nextText: 11
      },
		{
        text: "Şu anda hazır olmadığını ve biraz dinlenmek istediğini söyle./--/Скажи, что ты не готов/готова в данный момент, и ты хочешь немного отдохнуть.",
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: "Dedektif seni zorlamadı. Bulunduğun oda da artık yalnızsın. Raflardaki kitaplara bakıyorsun. Çok büyük bir kitap en tepede dikkatini çekti. Ona ulaşmaya çalışıyorsun. Tam yakaladım derken, birden bire dengeni kaybedip yere düşüyorsun, aşırı büyük bir kitap olan Rusça sözlük kafana düşüyor ve beynin zarar görüyor. Komaya girip, felç kalıyorsun. Kimliğin asla belirlenemiyor ve hiç kimse olarak Rusça merakın yüzünden ölüyorsun./--/Детектив не заставил тебя. Теперь ты один/одна в комнате. Ты смотришь на книги на полках. Одна очень большая книга наверху привлекла твоё внимание. Ты пытаешься достать рукой до книги. Почти достав книгу, ты внезапно потеряешь равновесие и падаешь на землю. Слишком большой словарь русского языка падает тебе на голову, и у твоего мозга повреждён. Ты впадаешь в кому и тебя парализует. Твоя личность не установлена и ты умер/умерла никем из-за своего любопытства к русскому языку.",
    options: [
      {
        text: "...Oyuna Tekrar Başla.../--/... Перезапустите игру ...",
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: "Senin amcan olduğunu söyleyen bir adam ve onun eşi aniden sana sarılmaya başladılar. Seni çok özlediklerini ve hep seni aradıklarından bahsediyorlar. O heyecanla amcan sana bir piyango bileti gösterip, senin olduğunu söylüyor. Sen hiçbir şey anlamayıp 'Bu ne?' diye soruyorsun. Bu piyango biletine en büyük ikramiyenin çıktığını ve biletin sana ait olduğunu söylüyor./--/Человек, назвавшийся твоим дядей, и его жена вдруг начали обнимать тебя. Они говорят о том, как сильно по тебе скучали и постоянно искали тебя. Он тебе показывает лотерейный билет и говорит, что билет твой. Ты ничего не понимаешь и спрашиваешь 'Что это?'. Он говорит, что это твой билет, который имеет самый главный выигрыш в лотерее.",
    options: [
      {
        text: "Bileti kabul al ve onların yeğeni olduğunu kabul et./--/Возьми билет и согласись, что ты их племянник/племянница.",
        nextText: 12
      },
	  {
		  text: "Onları hatırlamadığını, şu anda kim olduğunu bilmediğini ve bileti alamacağını söyle./--/Скажи, что ты их не помнишь, ты не знаешь кто ты, и ты не можешь взять лотерейный билет.",
		  nextText: 13
	  }
    ]
  },
	{
		id:12,
		text:"Artık bir milyonersin. Kendine çok lüks bir ev aldın. Hayatında her şey yolunda ve çok mutlusun. Mutlu iki yılın ardından sonra evine polis geldi. Gerçek kimliğini tespit edildiğini ve senin farklı bir kişi olduğun anlaşıldı ve hakkında dolandırıcılık suçundan dava açıldı. Soruşturma devam ederken hapiste kafana çok çok büyük bir Türkçe grammer kitabı düştü. Kitap yüzünden 5 yıl komada kalıp ve ölüyorsun./--/Теперь ты миллионер. Ты купил/купила себе роскошный дом. Всё хорошо и ты очень счастлив/счастлива. После двух счастливых лет к тебе приходит полиция. Твою личность установили, стало ясно, что ты другой человек, и возвудтили против тебя дело за мошенничество. Пока расследование продолжалось, в тюрьме очень большая книга о турецкой грамматики упала на твою голову. Ты впал/впала в кому и пробыл/пробыл в ней в течение 5 лет, в итоге ты умер/умерла.",
		options: [
      {
        text: "...Oyuna Tekrar Başla.../--/... Перезапустите игру ...",
        nextText: -1
      }
    ]
	},
	{
    id: 13,
    text: "O sırada dedektif içeri giriyor ve seni polis merkezine getiren kişi hakkında sorular soruyor. Seni polis merkezine getiren kişinin tehditini hatırlayıp ürküyorsun. O kişiyi tanımadığını söylüyorsun. Dedektif sözünü kesip diyor ki: 'O kişi bir katil ve şu anda diğerleri onu buraya getiriyor. Arabasındaki kutularda vücut parçaları var. Kutular üzerinde senin de parmak izin var. Senden de şüpheleniyoruz.' Sen şok oluyorsun./--/В это время детектив входит и спрашивает о человеке, который привёл тебя к полицейскому участку. Ты испугался/испугалась, вспоминая его угрозу. Ты говоришь, что ты его не знаешь. Детектив прервал и говорит: 'Этот человек убийца, теперь другие люди приводят его сюда. В его машине в коробках находятся части тела. Есть твои отпечатки пальцев на коробках. Мы также подозреваем тебя'. Ты в шоке.",
    options: [
      {
        text: "Dedektife şoför tarafından tehdit edildiğni söyle ve suçsuz olduğun konusunda dedektifi ikna etmeye çalış./--/Скажи детективу, что он тебе угрожал, и попытайся убедить детектива, что ты не виновен/виновна.",
        nextText: 14
      },
	  {
		  text: "Şoförün tehditi yüzünden korktuğun için hiçbir şey söyleme. Şimdilik bekle./--/Не говори ничего, потому что ты боишься угрозы водителя. Подожди.",
		  nextText: 17
	  }
    ]
  },
	{
    id: 14,
    text: "Dedektif seni dikkatle dinledi. Şimdilik seni şoför ile görüştürmeyeceğini söyledi. Seni ayrı bir odaya koydular ve orada bekletildin. Bir saat sonra dedektif odaya geldi ve dedi ki:'Arabadaki ceset senin sana benzeyen kişiye ait. Şoförün dediğine göre, sen kendisine o kişiyi öldürmesi için para veren, kendisine güvenmediğin için şuan kim olduğunu hatırlamayan bir kişi olarak rol yapan ve şuan onu katil olarak yakalatıp ondan kurtulmak isteyen birisin.'/--/Детектив внимательно послушал тебя. Он сказал, что на данный момент он не заставит тебя встретиться с водителем. Тебя поместили в другую комнату, и ты подождал/подождала. Через час детектив пришёл и говорит: 'Труп в машине принадлежит человеку, который похож на тебя. Опираясь на его слова, ты человек, кто дал/дала деньги убить этого человека. От того, что ты не доверяешь ему, ты действуешь как будто ты ничего не помнишь, и, ты хочешь чтобы он был пойман и избавиться от него.'",
    options: [
      {
        text: "Sinirden ceketini yere fırlat./--/Брось свою куртку на пол из-за злости.",
        nextText: 15
      },
	  {
		  text: "Sakin bir şekilde bekle./--/Подожди спокойно.",
		  nextText: 17
	  }
    ]
  },
	{
    id: 15,
    text: "Ceketinden bir fotoğraf düştü. Fotoğrafta üç kişi gözüküyor. Sen, şoför ve ölen kişi. Ölen kişiyle çok benziyorsunuz. Tek farkınız kollarınızdaki dövme. Onda dövme var, sende yok. Dedektif fotoğrafı alıyor. Herkes şok içinde./--/Фотография выпала из твоей куртки. Там изображены 3 человека : ты, водитель и убитый. Ты очень похож/похожа на убитого человека. Только одно различие - это татуировка на его руке. Детектив берет фотографию. Все в шоке.",
    options: [
      {
        text: "Şokun etkisiyle bulduğun bir boşlukta polis merkezinden kaç./--/Убегай из полицейского участка из-за шока.",
        nextText: 16
      },
	  {
		  text: "Dedektife ne olup bittiğini bilmediğini ve suçsuz olduğunu söyle./--/Скажи детективу, что ты не знаешь что происходит и ты не виновен/виновна.",
		  nextText: 17
	  }
    ]
  },
	{
    id: 16,
    text: "Hızla koşarak kaçmaya çalışırken kafana büyük bir Türkçe gramer kitabı düştü, 5 yıl komada kaldın ve öldün./--/Пока ты пытаешься убежать, на твою голову упала большая книга турецкой грамматики. Ты впал/впала в коматозе в течение 5 лет и умер/умерла.",
    options: [
		{
      text: "...Oyuna Tekrar Başla.../--/... Перезапустите игру ...",
        nextText: -1
		}
    ]
  },
	{
    id: 17,
    text: "Yapılan soruşturmalar sonucunda, zamanında Rusça öğrenmeye çalışırken kafayı yediğin ve psikolojik olarak çöktüğün ortaya çıktı. Özel bir kliniğe yerleştirildin. Orada sana özel yöntemlerle Rusça öğretildi. Rusça öğrendikten sonra, mucizevi bir şekilde iyileştin ve normal hayatına geri döndün./--/В результате исследований выяснилось, что когда ты пытался/пыталась выучить русский язык, ты сошёл/сошла с ума. Тебя поместили в специальную клинику. Там они учили тебя русскому языку специальными методами. После его изучения, как будто чудом, ты стал/стала чувствовать себя лучше и ты вернулся/вернулась в нормальное состояние.",
    options: [
		{
      text: "...Oyuna Tekrar Başla.../--/... Перезапустите игру ...",
        nextText: -1
		}
    ]
  },
	{
    id: 18,
    text: "Bir taksiye bindin ve taksinin radyosunda Rusça olarak Schubert'in Serenade bestesi çalıyor. Sen çok mutlu oluyorsun ve sen de söylüyorsun. Şoför sesini duyuyor ve çok güzel bir sesin olduğunu söylüyor. Yolda giderken şoför bir tabelada senin resmin ve bu akşam konserin olduğunu görüyor. Sen şok oluyorsun çünkü hiçbir şey hatırlamıyorsun. Şoför konsere mi gittiğini soruyor. Sen de bir gariplik olduğunu anlamasın diye 'Evet' diyorsun ve seni konser salonuna götürüyor. Taksiden inmek üzereyken cebinde paran olmadığını fark ediyorsun. Taksici seni ünlü bir sanatçı olduğunu sanıyor ve senin cebinde ona verecek hiç paran yok./--/Ты берёшь такси и по радио играет 'Серенада' Шуберта. Ты очень счастлив/счастлива и поешь. Водитель слышит тебя и говорит, что у тебя красивый голос. Во время поездки водитель видит твоё фото на билборде и видит, что у тебя концерт сегодня вечером. Ты в шоке, потому что ты ничего не помнишь. Водитель спрашивает, едем ли мы туда, на концерт. Ты говоришь да, потому что ты не хочешь, чтобы он заподозрил что-то. Он везет тебя в концертный зал. Перед тем как выйти из такси, ты понимаешь, что у тебя нет денег. Водитель думает, что ты известный/известная певец/певица и у тебя нет денег, чтобы заплатить ему.",
    options: [
      {
        text: "Taksiden hızla dışarı atla ve kaçmaya çalış./--/Выбегай из такси и пытайся убежать.",
        nextText: 20
      },
	  {
		  text: "Taksiciye evden acele ile çıktığını ve cüzdanını evde unuttuğunu söyle./--/Скажи, что ты выходила из дома в спешке и забыла кошелёк.",
		  nextText: 19
	  }
    ]
  },
	{
    id: 19,
    text: "Taksici eğer onu konserine bedava alırsan senden para istemeyeceğini söyledi. Aksi taktirde üzerindeki kıyafetleri taksi ücretine karşılık alacağını söyleyerek seni tehdit etti./--/Водитель сказал, что не потребует денег, если ты отведешь его на свой концерт. Если нет, то он заберёт твою одежду, как цена за поездку.",
    options: [
      {
        text: "Hızlıca açmaya çalış./--/Попытайся убежать быстро.",
        nextText: 20
      },
	  {
		  text: "Çaresiz bir şekilde senin olup olmadığını bilmediğin konsere taksici ile git./--/В отчаении иди с водителем на концерт, ты не знаешь твой или нет.",
		  nextText: 21
	  }
    ]
  },
	{
    id: 20,
    text: "Hızla koşarak kaçmaya çalışırken bir yerlerden kafana büyük bir Türkçe grammer kitabı düştü, 5 yıl komada kaldın ve öldün./--/Пока ты пытаешься убежать, на твою голову упала большая книга турецкой грамматики. Ты впал/впала в коматозе в течение 5 лет и умер/умерла.",
    options: [
		{
      text: "...Oyuna Tekrar Başla.../--/... Перезапустите игру ...",
        nextText: -1
		}
    ]
  },
	{
    id: 21,
    text: "Konser salonunun girişinde seni bir görevli karşıladı ve dedi ki: 'Konsere neden bu kadar geç kaldınız? Neredeyse insanlar evlerine geri döneceklerdi.' Seni hızla hazırlayıp sahneye çıkardılar. İlginç bir şekilde Schubert'in Serenade bestesi çaldı ve harika bir şekilde söyledin. İnsanlar çok mutlu bir şekilde seni alkışlarken birden uyandın ve her şeyin bir rüya olduğunu farkettin. Ardından hüzünlü bir şekilde Rusça kursuna gitmek için hazırlanmaya devam ettin. Serenat'ı Rusça olarak söyleme rüyası Rusça öğrenen birisi için ne kadar hoştu değil mi?/--/На входе в концертный зал тебя встречает работник и он /она спрашивает почему ты так поздно пришел/пришла, и говорит, что люди начали возвращаться домой. Они готовят тебя быстро и выводят на сцену. Начинает играть 'Серенада' Шуберта и ты поешь её восхитительно. Во время аплодисментов ты просыпаешься и понимаешь, что это все было во сне. После этого, ты расстроен /расстроена, и готовишься идти на занятия по русскому языку. Сон о пении 'Серенады' на русском.. Это ли не мечта для того, кто учит этот язык?",
     options: [
		{
      text: "Rusça Öğrenme Yolunda Başarılar:))) ...Oyuna Tekrar Başla.../--/Успехов в изучении русского языка :))) ... Перезапустите игру ...",
        nextText: -1
		}
    ]
  }
	
]

startGame()