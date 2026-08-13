export default function useFileSystem() {
  async function saveFile(
    contents: string,
    options: SaveFilePickerOptions,
  ): Promise<void> {
    try {
      const fileHandle = await window.showSaveFilePicker(options)
      const writable = await fileHandle.createWritable()
      await writable.write(contents)
      await writable.close()
    }
    catch (ex: any) {
      if (ex.name !== 'AbortError') {
        // eslint-disable-next-line no-console
        console.log(ex)
      }
    }
  }

  async function openFile(options: OpenFilePickerOptions): Promise<string> {
    try {
      const fileHandleList = await window.showOpenFilePicker(options)
      const fileHandle = fileHandleList[0]

      if (!fileHandle) {
        throw new Error('No file selected')
      }

      const file = await fileHandle.getFile()
      const contents = await file.text()
      return contents
    }
    catch (ex: any) {
      if (ex.name !== 'AbortError') {
        // eslint-disable-next-line no-console
        console.log(ex)
      }
    }
    return ''
  }

  return {
    saveFile,
    openFile,
  }
}
