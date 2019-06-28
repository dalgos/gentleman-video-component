declare module 'utils/id3' {
  const ID3: {
    getID3Frames: (id3Data: Uint8Array) => Array<{ key: string, info: string, data: string }>;
  }
  export default ID3
}

