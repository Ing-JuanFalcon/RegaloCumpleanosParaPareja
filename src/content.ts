export type StoryPhoto = {
  image: string
  alt: string
  chapter: string
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
      chapter: 'CAPÍTULO UNO · EL COMIENZO',
      title: 'El mundo se hizo más bonito',
      message: 'Desde tus primeros días ya había algo especial en ti. Esta pequeña foto guarda el inicio de una vida que, con el tiempo, llenaría de luz a tantas personas.',
      caption: 'el comienzo de todo',
    },
    {
      image: new URL('./optimized/fotocrecer.webp', import.meta.url).href,
      alt: 'Una foto de tu infancia mientras crecías',
      chapter: 'CAPÍTULO DOS · CADA PASITO',
      title: 'Y fuiste creciendo...',
      message: 'Un día a la vez, fuiste convirtiéndote en la mujer increíble que eres. Ojalá nunca olvides que cada etapa, cada sueño y cada versión de ti merece ser celebrada.',
      caption: 'tantas historias por delante',
    },
    {
      image: new URL('./optimized/fotofamiliar.webp', import.meta.url).href,
      alt: 'Una foto junto a tu familia',
      chapter: 'CAPÍTULO TRES · TUS RAÍCES',
      title: 'El amor que te acompaña',
      message: 'En los abrazos de tu familia viven muchas de las cosas bonitas que te hacen ser tú: tu fuerza, tu ternura y esa manera tan tuya de hacer sentir en casa.',
      caption: 'el amor siempre encuentra su lugar',
    },
    {
      image: new URL('./fotofinal.jpg', import.meta.url).href,
      alt: 'Una foto de los dos juntos',
      chapter: 'CAPÍTULO CUATRO · NUESTRO NOSOTROS',
      title: 'Y qué suerte encontrarte',
      message: 'De todas las vueltas que da la vida, mi favorita es la que me llevó hasta ti. Gracias por compartir tus días conmigo; quiero seguir coleccionando momentos a tu lado.',
      caption: 'mi lugar favorito es contigo',
    },
  ] satisfies StoryPhoto[],
  letter: {
    eyebrow: 'PARA TI, CON TODO MI AMOR',
    title: 'Lo que quiero que nunca olvides',
    paragraphs: [
      'Hoy celebro tu vida, pero también celebro la suerte inmensa de poder caminar cerquita de ti. Admiro tu forma de ser, todo lo que has superado y todo lo bonito que todavía te espera.',
      'Deseo que este nuevo año te regale motivos para reír, sueños que te emocionen y la confianza de saber que puedes llegar tan lejos como te propongas. Cuando lo necesites, aquí voy a estar: para aplaudirte, escucharte y recordarte cuánto vales.',
      'Feliz cumpleaños, mi amor. Que la vida te devuelva multiplicada toda la luz que tú le das a quienes te queremos. Te amo.',
    ],
    signoff: 'Siempre contigo,',
    signature: 'tu persona favorita',
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


