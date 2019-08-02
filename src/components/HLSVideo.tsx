import * as React from 'react'
import HLS, { Events as HLSEvents } from 'hls.js'
import ID3 from 'utils/id3'

const hlsConfig = {}

type FragChangeEventHandler = (url: string) => void
type FragParsingMetadataEventHandler = (url: string, timestamp: string) => void

export interface Props {
  className: string;
  id: string;
  isMute: boolean;
  onFragChange?: FragChangeEventHandler;
  onFragParsingMetaData?: FragParsingMetadataEventHandler;
  url: string;
  volume: number;
}

const { useEffect, useRef } = React

interface CreateHLSParams {
  onFragChange?: (url: string) => void;
  onFragParsingMetaData?: (url: string, timestamp: string) => void;
  url: string;
  videoElement: HTMLVideoElement;
}

interface ChangedFragment extends HLS.Fragment {
  relurl?: string;
}

interface FragParsingMetatdataData {
  frag: ChangedFragment;
  samples?: Array<{ data: Uint8Array; }>;
}

// ID3 Frame 반환
function getID3Frames(samples: Array<{ data: Uint8Array }> = []): Array<{ key: string; info: string; data: string; }> {
  return (samples[0] && samples[0].data) ? ID3.getID3Frames(samples[0].data) : []
}

// hls instance 생성
function createHLS({
  onFragChange,
  onFragParsingMetaData,
  url,
  videoElement,
}: CreateHLSParams): HLS {
  const hls = new HLS(hlsConfig)
  hls.loadSource(url)
  hls.attachMedia(videoElement)
  hls.on(HLSEvents.MANIFEST_PARSED, () => {
    videoElement.play()
  })
  onFragChange
    && hls.on(HLSEvents.FRAG_CHANGED, (_, { frag }: { frag: ChangedFragment }) => onFragChange(frag.relurl || ''))
  onFragParsingMetaData
    && hls.on(HLSEvents.FRAG_PARSING_METADATA, (_, { frag, samples = [] }: FragParsingMetatdataData) => {

      const { 0: { data } } = getID3Frames(samples)
      data && frag.relurl
        && onFragParsingMetaData(frag.relurl, JSON.parse(data)['server-timestamp'])

    })
  return hls
}

const HLSVideo: React.FunctionComponent<Props> = ({
  className,
  id,
  isMute,
  onFragChange,
  onFragParsingMetaData,
  url,
  volume,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    videoRef.current
      && createHLS({
        onFragChange,
        onFragParsingMetaData,
        url,
        videoElement: videoRef.current
      })
  }, [onFragChange, onFragParsingMetaData, videoRef])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  return (
    <video
      autoPlay={true}
      className={className}
      id={id}
      muted={isMute}
      preload="auto"
      ref={videoRef}
    />
  )
}

export default React.memo(HLSVideo)
