import {
    Skeleton,
    SkeletonItem,
    TableRow,
    TableCell
} from "@fluentui/react-components";
export function TableSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <Skeleton style={{display: 'flex', flexDirection: 'row'}}>
                    <SkeletonItem shape="circle"style={{marginRight: '10px'}} />
                    <SkeletonItem />
                </Skeleton>
            </TableCell>
            <TableCell>
                <Skeleton>
                    <SkeletonItem />
                </Skeleton>
            </TableCell>
            <TableCell>
                <Skeleton style={{display: 'flex', flexDirection: 'row'}}>
                    <SkeletonItem style={{width: '45%', marginRight: '5%'}}/>
                    <SkeletonItem style={{width: '45%'}}/>
                </Skeleton>
            </TableCell>
        </TableRow>
    );
}