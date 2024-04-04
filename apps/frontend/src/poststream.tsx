import { useState } from 'react';
import { HiReply, HiX } from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';

import { Message, MessageWithId } from './types';
import PostForm from './newform';

const PostStream = ({
  author,
  text,
  depth,
}: Message & {
  key: string;
  depth: number;
}) => {
  const [reply, setReply] = useState<MessageWithId>();
  const [replyOpen, setReplyOpen] = useState(false);

  return (
    <li className="flex flex-col">
      <div>
        <p className="text-sm text-sky-700 tracking-wide">{author}</p>
        <p className="mt-1">{text}</p>
      </div>
      {depth < 1 ? (
        <>
          {
            <ul className="border-l-gray-300 border-l-2 mb-2 pl-3 flex flex-col gap-3 py-1">
              {
                <PostStream
                  key={reply.id}
                  depth={depth + 1}
                  author={''}
                  text={''}
                />
              }
            </ul>
          }
          <button
            type="button"
            onClick={() => setReplyOpen((v) => !v)}
            className="mr-auto text-gray-400 text-sm flex gap-1 items-center tracking-wide"
          >
            {replyOpen ? (
              <>
                <HiX />
                Cancel
              </>
            ) : (
              <>
                <HiReply />
                Reply
              </>
            )}
          </button>
          {replyOpen && (
            <div className="mt-2">
              <PostForm
                onSubmit={(text) => {
                  setReplyOpen(false);
                  setReply({ id: uuidv4(), ...text });
                }}
              />
            </div>
          )}
        </>
      ) : null}
    </li>
  );
};

export default PostStream;
