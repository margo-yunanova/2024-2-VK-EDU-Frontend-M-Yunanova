import styles from './GroupChatCreationModal.module.scss';
import { IGroupChatCreationModal } from './GroupChatCreationModal.props';

export const GroupChatCreationModal = ({
  onChange,
  title = '',
}: IGroupChatCreationModal) => {
  return (
    <form className={styles.wrap}>
      <label htmlFor="username" className={styles.label}>
        <span>Group title</span>
        <input
          className={styles['form-input']}
          type="text"
          required
          name="title"
          id="title"
          onChange={onChange}
          value={title}
        />
      </label>
    </form>
  );
};
