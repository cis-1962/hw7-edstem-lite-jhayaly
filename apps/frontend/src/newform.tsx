import { useState } from 'react';
import { Message } from './types';

const PostForm = ({
  onSubmit,
  clear,
}: {
  onSubmit: (message: Message) => void;
  clear?: boolean;
}) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const fieldsInvalid = !(author.trim().length && text.trim().length);

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        onSubmit({ author, text });
        if (clear) {
          setAuthor('');
          setText('');
        }
      }}
      className="flex flex-col"
    >
      <input
        type="text"
        value={author}
        onChange={(evt) => setAuthor(evt.target.value)}
        placeholder="Your Name Here"
        className="rounded py-2 px-3 border-gray-300 border-[1px] mb-3"
      />
      <textarea
        value={text}
        onChange={(evt) => setText(evt.target.value)}
        placeholder="Your Message Here"
        className="rounded py-2 px-3 border-gray-300 border-[1px] resize-none mb-3 whitespace-wrap"
      />
      <button
        type="submit"
        className={`rounded px-6 py-2 ${
          fieldsInvalid ? 'bg-blue-400' : 'bg-blue-700'
        } text-white ml-auto tracking-wide`}
        disabled={fieldsInvalid}
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;
