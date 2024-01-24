export async function saveData(contents: string) {
  try {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: 'new_tab_settings',
      types: [
        {
          accept: {
            'text/plain': ['.json']
          }
        }
      ]
    })
    const writable = await fileHandle.createWritable()
    await writable.write(contents)
    await writable.close()
  } catch (ex: any) {
    if (ex.name !== 'AbortError') {
      console.log(ex)
    }
  }
}

export async function writeData(): Promise<string> {
  try {
    const fileHandle = await window.showOpenFilePicker({
      types: [
        {
          accept: {
            'text/plain': ['.json']
          }
        }
      ]
    })
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
