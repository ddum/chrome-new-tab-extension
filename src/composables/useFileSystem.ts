export default function useFileSystem() {
  async function saveFile(contents: string, options: SaveFilePickerOptions): Promise<void> {
    try {
      const fileHandle = await window.showSaveFilePicker(options)
      const writable = await fileHandle.createWritable()
      await writable.write(contents)
      await writable.close()
    } catch (ex: any) {
      if (ex.name !== 'AbortError') {
        console.log(ex)
      }
    }
  }

  async function openFile(options: OpenFilePickerOptions): Promise<string> {
    try {
      const fileHandle = await window.showOpenFilePicker(options)
      const file = await fileHandle[0].getFile()
      const contents = await file.text()
      return contents
    } catch (ex: any) {
      if (ex.name !== 'AbortError') {
        console.log(ex)
      }
    }
    return ''
  }

  return {
    saveFile,
    openFile
  }
}
