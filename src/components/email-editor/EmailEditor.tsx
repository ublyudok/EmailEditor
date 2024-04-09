import { Bold, Eraser, Italic, Underline } from 'lucide-react'
import styles from './EmailEditor.module.scss'
import { useRef, useState } from 'react'
import { TStyle, applyStyle } from './apply-style'
import parse from 'html-react-parser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { emailService } from '../../services/email.service'

export function EmailEditor() {
const [text, setText] = useState('')
const [selectionStart, setSelectionStart] = useState(0)
const [selectionEnd, setSelectionEnd] = useState(0)

const textRef = useRef<HTMLTextAreaElement | null>(null)

const queryClient = useQueryClient()

const {mutate, isPending} = useMutation({
  mutationKey: ['create email'],
  mutationFn: () => emailService.sendEmail(text),
  onSuccess:() => {
    setText('')
    queryClient.refetchQueries({ queryKey: ['email list']})
  }
})

const updateSelection = () => {
  if(!textRef.current) return
  setSelectionStart(textRef.current.selectionStart)
  setSelectionEnd(textRef.current.selectionEnd)
}

const applyFormat = (type: TStyle) => {
 
  const selectedText = text.substring(selectionStart, selectionEnd)
  if(!selectedText) return 
  const before = text.substring(0, selectionStart)
  const after = text.substring(selectionEnd)  

  setText(before + applyStyle(type, selectedText) + after)

}

  return (
    <div>
      <h1>email-editor</h1>
        {text && <div className={styles.preview}>{parse(text)}</div>}
      <div className={styles.card}>
        <textarea value={text} onChange={e => setText(e.target.value)} className={styles.editor} spellCheck='false' onSelect={updateSelection} ref={textRef}>
          {text}  
        </textarea>
        <div className={styles.actions}>
          <div className={styles.tools}>
            <button><Eraser size={17} onClick={() => setText('')} /></button>
            <button><Bold size={17} onClick={() => applyFormat('bold')} /></button>
            <button><Italic size={17} onClick={() => applyFormat('italic')} /></button>
            <button><Underline size={17} onClick={() => applyFormat('underline')} /></button>

          </div>
          <button disabled={isPending} onClick={() => mutate()}>Send Now</button>
        </div>
      </div>
    </div>
  )
}
