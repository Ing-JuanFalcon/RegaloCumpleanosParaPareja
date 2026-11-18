import { ArrowLeft } from 'lucide-react'
import { yearCollagePhotos } from '../content'
import { Decor } from '../components/Decor'
import { PencilButton } from '../components/PencilButton'
import { Reveal, SceneFrame } from '../components/SceneFrame'

export function CollageScene({ onBack, onFinish }: { onBack: () => void; onFinish: () => void }) {
  return (
    <SceneFrame className="collage-scene">
      <Decor scene={3} />
      <button type="button" className="story-back" onClick={onBack} aria-label="Volver a la carta"><ArrowLeft size={17} /></button>
      <div className="collage-content">
        <Reveal className="collage-title"><h2>Recuento del año (Casi jaja)</h2></Reveal>
        <div className="year-collage">
          {yearCollagePhotos.map((photo, index) => (
            <Reveal key={photo.src} className={`collage-cell collage-cell-${index + 1}`} delay={.1 + index * .07}>
              <div className="collage-photo">
                <span className="collage-placeholder"><i>✦</i><span>{photo.label}</span></span>
                <img src={photo.src} alt={photo.label} onError={event => { event.currentTarget.style.display = 'none' }} />
                <span className="collage-tape" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="collage-finish"><PencilButton onClick={onFinish}>Finalizar</PencilButton></Reveal>
      </div>
    </SceneFrame>
  )
}
