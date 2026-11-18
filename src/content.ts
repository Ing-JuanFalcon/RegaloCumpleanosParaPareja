export type StoryPhoto = {
  image: string
  alt: string
  chapter?: string
  title: string
  message: string
  caption: string
}

export const birthdayContent = {
  title: '¡Feliz cumpleaños mi Dians!',
  start: 'Comenzar',
  date: '18 de noviembre de 2001',
  musicLabel: 'My Only Exception',
  songTitle: 'My Only Exception',
  songArtist: 'Paramore',
  signature: 'Hecho por Juan Falcón, tu Sr. Pera, para ti',
  photos: [
    {
      image: new URL('./optimized/fotobebe.webp', import.meta.url).href,
      alt: 'Una foto de cuando eras bebé',
      title: '¡Un día como hoy nació una persona especial, nada más y nada menos que Ceci!',
      message: 'Una niña que no sabía todo lo que la vida le depararía, pero que cambiaría muchas vidas más, incluida la de un futuro chico que atesoraría este día como el más importante.',
      caption: 'el comienzo de todo',
    },
    {
      image: new URL('./optimized/fotocrecer.webp', import.meta.url).href,
      alt: 'Una foto de tu infancia mientras crecías',
      title: 'Seguiste creciendo',
      message: 'Los gustos de esta bella chicuela se fueron extendiendo a muchos campos; casi sin querer, se volvió experta en todo. Pero, lo más importante: descubrió un talento oculto que casi nadie en este mundo posee: la creatividad, un talento que sorprendería a todos por lo hermoso que es.',
      caption: 'tantas historias por delante',
    },
    {
      image: new URL('./optimized/fotofamiliar.webp', import.meta.url).href,
      alt: 'Una foto junto a tu familia',
      title: 'Una familia numerosa',
      message: 'Es increíble cómo esta chica ha influido en la vida de cada persona que la rodea. Su sinceridad no se anda con rodeos y ayuda a todos a su manera. Con el tiempo, su familia y sus amigos aumentan, pero ella siempre destacará en mi corazón.',
      caption: 'el amor siempre encuentra su lugar',
    },
    {
      image: new URL('./fotofinal.jpg', import.meta.url).href,
      alt: 'Una foto de los dos juntos',
      title: 'Mi mejor regalo',
      message: 'Encontré a la persona más importante de mi vida: mi Dians. Con ella, aprendí a amar y a disfrutar la vida. Mi mayor logro en esta vida lo conseguí hace mucho tiempo: lo logré el día que te conocí.',
      caption: 'mi lugar favorito es contigo',
    },
  ] satisfies StoryPhoto[],
  letter: {
    eyebrow: 'PARA TI, CON TODO MI AMOR',
    title: '18-11-2026',
    paragraphs: [
      'Muchas felicidades, mi Dians. Soy el chico más afortunado de poder tenerte un año más conmigo, y espero que así sea por muchos años más. Sabes que soy un chico de sistemas y apuesto a que no esperabas una página. No he hecho esto por nadie, y ahora encontré una nueva forma de demostrarte cuánto te amo. Puedes volver a este recuerdo cada vez que quieras y, con ello, tener guardada aquí mi carta digital.',
      'Te amo mucho, mi Dians. Cada cumpleaños tuyo recibo un regalo, y ese regalo eres tú.',
    ],
    signoff: 'Atentamente,',
    signature: 'Manriquez.',
  },
}

export const soundtrackUrl = new URL('./optimized/song.mp3', import.meta.url).href
export const characterAssets = {
  peach: new URL('./peachizquierda.png', import.meta.url).href,
  goma: new URL('./goma derecha.png', import.meta.url).href,
  together: new URL('./peachgomasjuntos.png', import.meta.url).href,
  transition: new URL('./segundatransision.gif', import.meta.url).href,
  afterBaby: new URL('./transisiontres.gif', import.meta.url).href,
  afterGrowing: new URL('./optimized/primer-transicion.webm', import.meta.url).href,
  afterFamily: new URL('./optimized/gi3.webm', import.meta.url).href,
  afterTogether: new URL('./optimized/gi4.webm', import.meta.url).href,
  afterFinalPhoto: new URL('./optimized/gi5.webm', import.meta.url).href,
  extraPhoto: new URL('./optimized/fotocasifinal.webp', import.meta.url).href,
  posters: {
    afterBaby: new URL('./optimized/posters/despues-bebe.jpg', import.meta.url).href,
    afterGrowing: new URL('./optimized/posters/primer-transicion.jpg', import.meta.url).href,
    afterFamily: new URL('./optimized/posters/gi3.jpg', import.meta.url).href,
    afterTogether: new URL('./optimized/posters/gi4.jpg', import.meta.url).href,
    afterFinalPhoto: new URL('./optimized/posters/gi5.jpg', import.meta.url).href,
  },
}
export const songCoverUrl = new URL('./optimized/cover.webp', import.meta.url).href

export const yearCollagePhotos = Array.from({ length: 6 }, (_, index) => ({
  src: index === 0 ? new URL('./1.jpg', import.meta.url).href : new URL(`./optimized/${index + 1}.webp`, import.meta.url).href,
  label: `Recuerdo 0${index + 1}`,
}))


