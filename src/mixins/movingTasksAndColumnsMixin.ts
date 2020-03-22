import { Component, Prop, Vue } from "vue-property-decorator";
import { Column } from '@/models/Column';
import { Board } from '@/models/Board';
import { Task } from '@/models/Task';

@Component
export default class MovingClassAndColumnsMixin extends Vue {
    @Prop({ required: true }) column!: Column;
    @Prop({ required: true }) columnIndex!: number;
    @Prop({ required: true }) board!: Board;

    moveTaskOrColumn(
        event: DragEvent,
        toColumn: Task[],
        toColumnIndex: number,
        toTaskIndex?: number
    ) {
        const type = event.dataTransfer?.getData("type") || "";
        if (type === "task") {
            const taskIndex =
                toTaskIndex !== undefined ? toTaskIndex : toColumn.length;
            this.moveTask(event, toColumn, taskIndex);
        } else {
            this.moveColumn(event, toColumnIndex);
        }
    }

    moveTask(event: DragEvent, toColumn: Task[], toTaskIndex?: number) {
        const columnData = event.dataTransfer?.getData("from-column-index") || "";
        const taskData = event.dataTransfer?.getData("from-task-index") || "";
        const fromColumnIndex = parseInt(columnData);
        const fromTaskIndex = parseInt(taskData);
        const fromTasks = this.board.columns[fromColumnIndex].tasks;

        this.$store.commit("MOVE_TASK", {
            fromColumn: fromTasks,
            toColumn: toColumn,
            fromTaskIndex: fromTaskIndex,
            toTaskIndex: toTaskIndex
        });
    }

    moveColumn(event: DragEvent, toColumnIndex: number) {
        const columnData = event.dataTransfer?.getData("from-column-index") || "";
        const fromColumnIndex = parseInt(columnData);

        this.$store.commit("MOVE_COLUMN", {
            fromColumnIndex,
            toColumnIndex
        });
    }
}