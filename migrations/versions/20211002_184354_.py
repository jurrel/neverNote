"""empty message

Revision ID: dd51c1db326a
Revises: 395ffeffaf71
Create Date: 2021-10-02 18:43:54.105511

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'dd51c1db326a'
down_revision = '395ffeffaf71'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('notebooks', 'updatedAt')
    op.drop_column('notebooks', 'createdAt')
    op.drop_column('notes', 'updatedAt')
    op.drop_column('notes', 'createdAt')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('notes', sa.Column('createdAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.add_column('notes', sa.Column('updatedAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.add_column('notebooks', sa.Column('createdAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.add_column('notebooks', sa.Column('updatedAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###